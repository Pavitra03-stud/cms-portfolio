import "../styles/Hero.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const heroQuery = `*[_type=="hero"][0]{
  name,
  role,
  tagline,
  heroImage,
  "heroBackgroundUrl": heroBackground.asset->url,
  useBackgroundImage,
  overlayColor,
  showOverlay,
  heroHeight,
  backgroundPosition,
  backgroundSize,
  imageShape,
  imagePosition,
  textAlign,
  backgroundColor,
  contentPosition,
  enableContentBox,
  boxBackground,
  backdropBlur,
boxOpacity,
boxBorder,
  boxPadding,
  boxWidth,
  boxMaxWidth,
  boxVertical,
boxAnimation,
  boxBorderRadius,
  boxPosition,
  buttonLayout,
  buttonGap,
buttonPadding,
buttonBorderRadius,
buttonWidth,
  boxShadow,
  buttonPosition,
  buttons[]{
    label,
    url,
    variant,
    backgroundColor,
    textColor,
    borderColor,
    openInNewTab
  },
  contentBlocks[]{
  _key,
  type,
  content,
  image,
  buttonText,
  buttonLink,
  items[]{
    icon,
    title,
    subtitle
  },
  x,
  y,
  width,
  padding,
  background,
  borderRadius,
  boxShadow,
  backdropBlur,
  animation
},
  "resumeUrl": resumeFile.asset->url,
  showSection
}`;

const portableComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="hero-quote">{children}</blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => (
      <span style={{ textDecoration: "underline" }}>{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    ),
    code: ({ children }) => (
      <code className="hero-code">{children}</code>
    ),
    textColor: ({ value, children }) => {
      const colors = {
        accent: "var(--accent-color)",
        blue: "#60a5fa",
        pink: "#ff7ab6",
        white: "#ffffff",
        black: "#000000",
      };

      return (
        <span style={{ color: colors[value?.color] || "inherit" }}>
          {children}
        </span>
      );
    },
    fontSize: ({ value, children }) => (
      <span style={{ fontSize: value?.size || "inherit" }}>
        {children}
      </span>
    ),
    fontFamily: ({ value, children }) => (
      <span style={{ fontFamily: value?.family || "inherit" }}>
        {children}
      </span>
    ),
  },
};

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    client.fetch(heroQuery).then((data) => {
      console.log(data);
      console.log("Button Layout =", data.buttonLayout);
      console.log("Hero Data:", data);
      console.log("Background URL:", data?.heroBackgroundUrl);
      console.log("Use Background:", data?.useBackgroundImage);
      setHero(data);
    });
  }, []);

  if (!hero || !hero.showSection) return null;

  const renderButtons = () => {
    if (!hero.buttons?.length && !hero.resumeUrl) return null;

    return (
      //       <div
      //   className="hero-buttons"
      //   style={{
      //     display: "flex",
      //     flexDirection: hero.buttonLayout || "row",
      //     justifyContent:
      //       hero.buttonPosition === "center"
      //         ? "center"
      //         : hero.buttonPosition === "right"
      //         ? "flex-end"
      //         : "flex-start",

      //     gap: "16px",
      //     flexWrap: "wrap",
      //     alignItems: "center",
      //   }}
      // >
      <div
        className="hero-buttons"
        style={{
          display: "flex",
          flexDirection: hero.buttonLayout || "row",
          gap: hero.buttonGap || "16px",
          // flexWrap: "wrap",
          flexWrap: hero.buttonLayout === "row" ? "nowrap" : "wrap",

          justifyContent:
            hero.buttonPosition === "center"
              ? "center"
              : hero.buttonPosition === "right"
                ? "flex-end"
                : "flex-start",

          alignItems: "center",
          width: "100%",  
        }}
      >
        {hero.buttons?.map((btn, index) => {
          const isResume = btn.label?.toLowerCase().includes("resume");

          const link =
            btn.url || (isResume ? hero.resumeUrl : null);

          if (!link) return null;

          return (
            <a
              key={index}
              href={link}
              target={btn.openInNewTab || isResume ? "_blank" : "_self"}
              rel="noreferrer"
              className={`hero-btn ${btn.variant || "filled"}`}
              style={{
                background:
                  btn.variant === "filled"
                    ? btn.backgroundColor || "var(--accent-color)"
                    : "transparent",

                color: btn.textColor || "#fff",

                border:
                  btn.variant === "outline"
                    ? `2px solid ${btn.borderColor || "#fff"}`
                    : "none",

                padding: hero.buttonPadding || "16px 34px",

                borderRadius: hero.buttonBorderRadius || "30px",

                // width: hero.buttonWidth || "auto",/
                width: hero.buttonWidth || "fit-content",
                display: "inline-flex",
                flex: "0 0 auto",
                justifyContent: "center",
                alignItems: "center",

                whiteSpace: "nowrap",
              }}
            >
              {btn.label}
            </a>
          );
        })}

        {!hero.buttons?.length && hero.resumeUrl && (
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hero-btn filled"
          >
            Download Resume
          </a>
        )}
      </div>
    );
  };

  const imageUrl = hero.heroImage
    ? hero.imageShape === "rectangle"
      ? urlFor(hero.heroImage)
        .width(900)
        .height(600)
        .fit("crop")
        .url()
      : hero.imageShape === "square"
        ? urlFor(hero.heroImage)
          .width(700)
          .height(700)
          .fit("crop")
          .url()
        : hero.imageShape === "diamond"
          ? urlFor(hero.heroImage)
            .width(700)
            .height(700)
            .fit("crop")
            .url()
          : hero.imageShape === "star"
            ? urlFor(hero.heroImage)
              .width(700)
              .height(700)
              .fit("crop")
              .url()
            : urlFor(hero.heroImage)
              .width(700)
              .height(700)
              .fit("crop")
              .url()
    : null;

  return (
    <section
      className="hero"
      id="home"
      style={{
        minHeight: hero.heroHeight || "100vh",
        backgroundImage:
          hero.useBackgroundImage && hero.heroBackgroundUrl
            ? `url(${hero.heroBackgroundUrl})`
            : "none",
        backgroundSize: hero.backgroundSize || "cover",
        backgroundPosition: hero.backgroundPosition || "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-container">
        {hero.contentBlocks?.map((block) => (
          <div
            key={block._key}
            className={`dynamic-block ${block.animation || ""}`}
            style={{
              position: "absolute",
              left: `${block.x}px`,
              top: `${block.y}px`,
              width: block.width || "350px",
              padding: block.padding || "30px",
              background: block.background || "transparent",
              borderRadius: block.borderRadius || "15px",
              backdropFilter: block.backdropBlur
                ? `blur(${block.backdropBlur})`
                : "none",
              boxShadow: block.boxShadow
                ? "0 15px 40px rgba(0,0,0,.25)"
                : "none",
              color: "#fff",
              zIndex: 10,
            }}
          >
           {block.type === "stats" && (
  <>
    {block.items?.map((item, index) => (
      <div className="stat-item" key={index}>

        {item.icon && (
          <img
            src={urlFor(item.icon).width(50).url()}
            className="stat-icon"
            alt=""
          />
        )}

        <div>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>

      </div>
    ))}
  </>
)}

{block.type === "heading" && (
  <PortableText
    value={block.content}
    components={portableComponents}
  />
)}

{block.type === "paragraph" && (
  <PortableText
    value={block.content}
    components={portableComponents}
  />
)}

{block.type === "button" && (
  <a href={block.buttonLink} className="hero-btn filled">
    {block.buttonText}
  </a>
)}

{block.type === "image" && block.image && (
  <img
    src={urlFor(block.image).width(500).url()}
    alt=""
    style={{
      width: "100%",
      borderRadius: "15px",
    }}
  />
)}
          </div>
        ))}

        <div
          className={`hero-content
    ${hero.imagePosition === "right" ? "reverse" : ""}
    ${hero.imagePosition === "top" ? "column" : ""}
    ${hero.imagePosition === "bottom" ? "column-reverse" : ""}
  `}
          style={{
            justifyContent:
              hero.boxPosition === "left"
                ? "flex-start"
                : hero.boxPosition === "center"
                  ? "center"
                  : "flex-end",

            alignItems:
              hero.boxVertical === "top"
                ? "flex-start"
                : hero.boxVertical === "bottom"
                  ? "flex-end"
                  : "center",
          }}
        >
          {hero.heroImage && (
            <div className="hero-image-wrapper">
              <img
                src={imageUrl}
                alt="Profile"
                className={`hero-img ${hero.imageShape || "circle"}`}
              />
            </div>
          )}

          {/* <div
            className="hero-text"
            style={{
              textAlign: hero.textAlign || "left",
            }}
          > */}
          <div
            className={`hero-text ${hero.boxAnimation || ""}`}
            style={{
              background: hero.boxBackground,
              backdropFilter: hero.backdropBlur
                ? `blur(${hero.backdropBlur})`
                : "none",

              opacity: hero.boxOpacity ?? 1,

              padding: hero.boxPadding || "50px",

              width: hero.boxWidth || "650px",

              maxWidth: hero.boxMaxWidth || "520px",

              borderRadius: hero.boxBorderRadius || "20px",

              border: hero.boxBorder || "none",

              boxShadow: hero.boxShadow
                ? "0 20px 60px rgba(0,0,0,.35)"
                : "none",
            }}
          >
            {hero.buttonPosition === "top" && renderButtons()}

            {hero.name && (
              <PortableText
                value={hero.name}
                components={portableComponents}
              />
            )}

            {hero.role && (
              <PortableText
                value={hero.role}
                components={portableComponents}
              />
            )}

            {hero.tagline && (
              <PortableText
                value={hero.tagline}
                components={portableComponents}
              />
            )}

            {(!hero.buttonPosition ||
              hero.buttonPosition === "bottom" ||
              hero.buttonPosition === "left" ||
              hero.buttonPosition === "center" ||
              hero.buttonPosition === "right") &&
              renderButtons()}
          </div>
        </div>
      </div>
    </section>
  );
}
