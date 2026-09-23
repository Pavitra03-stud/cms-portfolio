import "../styles/About.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (src) => builder.image(src);

/* ================= QUERY ================= */

const aboutQuery = `*[_type=="about"][0]{
  heading,
  description,

  profileImage,
  imageShape,
  imagePosition,
  imageWidth,
  imageHeight,
  imageBorder,
  imageBorderRadius,
  imageShadow,
  imageOpacity,
imageObjectFit,
  imageAnimation,

  textAlign,
  headingPosition,
  headingAlign,

  backgroundColor,
  "backgroundImageUrl": backgroundImage.asset->url,
  useBackgroundImage,
  backgroundPosition,
  backgroundSize,
  overlayColor,
  showOverlay,
  sectionHeight,

  enableContentBox,
  boxBackground,
  backdropBlur,
  boxOpacity,
  boxPadding,
  boxWidth,
  boxMaxWidth,
boxMinHeight,
boxBorderWidth,
boxBorderColor,
  boxBorderRadius,
  boxBorder,
  boxShadow,
  boxAnimation,
  boxPosition,
  boxVertical,
boxOffsetX,
boxOffsetY,
  buttons,
  buttonPosition,
  buttonLayout,
  buttonGap,
  buttonWidth,
  buttonPadding,
  buttonBorderRadius,

  features[]{
    icon,
    title,
    description,
    background,
    borderRadius,
    boxShadow
  },

  contentBlocks[]{
    _key,
    type,
    content,
    image,
    buttonText,
    buttonLink,
    statistics,
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

  showSection
}`;

/* ================= PORTABLE TEXT ================= */

const portableComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote>{children}</blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,

    underline: ({ children }) => (
      <span style={{ textDecoration: "underline" }}>
        {children}
      </span>
    ),

    "strike-through": ({ children }) => (
      <span style={{ textDecoration: "line-through" }}>
        {children}
      </span>
    ),

    textColor: ({ children, value }) => (
      <span style={{ color: value?.color }}>
        {children}
      </span>
    ),

    fontSize: ({ children, value }) => (
      <span style={{ fontSize: value?.size }}>
        {children}
      </span>
    ),

    fontFamily: ({ children, value }) => (
      <span style={{ fontFamily: value?.family }}>
        {children}
      </span>
    ),
  },
};

/* ================= COMPONENT ================= */

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    client.fetch(aboutQuery).then((data) => {
      console.log("ABOUT DATA:", data);
      setAbout(data);
    });
  }, []);

  if (!about) {
    return <h2>Loading About...</h2>;
  }

  if (!about.showSection) {
    return null;
  }

  const imageUrl = about.profileImage
  ? about.profileImage.url
  : null;

  const renderButtons = () => {
    if (!about.buttons?.length) return null;

    return (
      <div
        className="about-buttons"
        style={{
          display: "flex",
          flexDirection: about.buttonLayout || "row",
          gap: about.buttonGap || "16px",
          flexWrap:
            about.buttonLayout === "row"
              ? "nowrap"
              : "wrap",

          justifyContent:
            about.buttonPosition === "center"
              ? "center"
              : about.buttonPosition === "right"
                ? "flex-end"
                : "flex-start",

          alignItems: "center",
        }}
      >
        {about.buttons.map((btn, index) => (
          <AboutButton key={index} btn={btn} />
        ))}
      </div>
    );
  };
  const renderHeading = () => (
    about.heading && (
      <div
        className="about-title"
        style={{
          display: "flex",
          justifyContent:
            about.headingAlign === "center"
              ? "center"
              : about.headingAlign === "right"
                ? "flex-end"
                : "flex-start",
        }}
      >
        <PortableText
          value={about.heading}
          components={portableComponents}
        />
      </div>
    )
  );

  return (
    <section
      className="about"
      id="about"
      style={{
        minHeight: about.sectionHeight || "100vh",

        backgroundColor: about.backgroundColor,

        backgroundImage:
          about.useBackgroundImage &&
            about.backgroundImageUrl
            ? `url(${about.backgroundImageUrl})`
            : "none",

        backgroundSize:
          about.backgroundSize || "cover",

        backgroundPosition:
          about.backgroundPosition || "center",

        backgroundRepeat: "no-repeat",

        position: "relative",
      }}
    >
      {about.showOverlay && (
        <div
          className="about-overlay"
          style={{
            background:
              about.overlayColor ||
              "rgba(0,0,0,.35)",
          }}
        />
      )}

      <div className="about-container">
        {/* ================= HEADING ================= */}

        <div
          className="about-title"
          style={{
            display: "flex",
            justifyContent:
              about.headingAlign === "center"
                ? "center"
                : about.headingAlign === "right"
                  ? "flex-end"
                  : "flex-start",
          }}
        >
          {about.heading && (
            <PortableText
              value={about.heading}
              components={portableComponents}
            />
          )}
        </div>

        {/* ================= CONTENT ================= */}

        <div
          className={`about-content
          ${about.imagePosition === "right" ? "reverse" : ""}
          ${about.imagePosition === "top" ? "column" : ""}
          ${about.imagePosition === "bottom" ? "column-reverse" : ""}
        `}
          style={{
            justifyContent:
              about.boxPosition === "left"
                ? "flex-start"
                : about.boxPosition === "center"
                  ? "center"
                  : "flex-end",

            alignItems:
              about.boxVertical === "top"
                ? "flex-start"
                : about.boxVertical === "bottom"
                  ? "flex-end"
                  : "center",
          }}
        >

          {/* ================= IMAGE ================= */}

          {imageUrl && (
            <div className="about-image-wrapper">
              <img
                src={imageUrl}
                alt="About"
                className={`about-img ${about.imageShape || "circle"} ${about.imageAnimation || ""}`}
                style={{
                  width: about.imageWidth || "420px",

                  height: about.imageHeight || "420px",

                  objectFit:
                    about.imageObjectFit || "cover",

                  border:
                    about.imageBorder || "none",

                  borderRadius:
                    about.imageBorderRadius || undefined,

                  opacity:
                    about.imageOpacity ?? 1,

                  boxShadow:
                    about.imageShadow
                      ? "0 20px 60px rgba(0,0,0,.35)"
                      : "none",
                }}
              />
            </div>
          )}

          {/* ================= CONTENT BOX ================= */}

          <div
            className={`about-text ${about.boxAnimation || ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "20px",
              marginTop: "40px",   // <-- change this value
            }}
            styles={{
              textAlign: about.textAlign || "left",

              background: about.enableContentBox
                ? about.boxBackground
                : "transparent",

              backdropFilter: about.enableContentBox
                ? `blur(${about.backdropBlur})`
                : "none",

              opacity: about.boxOpacity ?? 1,

              padding: about.enableContentBox
                ? about.boxPadding
                : "0",

              width: about.enableContentBox
                ? about.boxWidth
                : "100%",

              maxWidth:
                about.boxMaxWidth || "650px",

              minHeight:
                about.boxMinHeight || "auto",

              borderRadius:
                about.boxBorderRadius || "20px",

              border: about.boxBorder
                ? `${about.boxBorderWidth || "1px"} solid ${about.boxBorderColor || "#ffffff20"}`
                : "none",

              boxShadow:
                about.enableContentBox &&
                  about.boxShadow
                  ? "0 20px 60px rgba(0,0,0,.35)"
                  : "none",
              transform:
                window.innerWidth <= 768
                  ? "none"
                  : `translate(${about.boxOffsetX || 0}px,
${about.boxOffsetY || 0}px)`,

              transition: "all .3s ease",
            }}
          >

            {/* ================= TOP BUTTON ================= */}

            {about.buttonPosition === "top" &&
              renderButtons()}

            {/* ================= DESCRIPTION ================= */}

            {about.description && (
              <PortableText
                value={about.description}
                components={portableComponents}
              />
            )}

            {/* ================= BOTTOM BUTTON ================= */}

            {about.buttonPosition === "bottom" &&
              renderButtons()}

            {/* ================= CENTER BUTTON ================= */}

            {about.buttonPosition === "center" &&
              renderButtons()}
            {/* ================= FEATURE CARDS ================= */}

            {about.features?.length > 0 && (
              <div className="about-features">

                {about.features.map((feature, index) => (

                  <div
                    key={index}
                    className="feature-card"
                    style={{
                      background:
                        feature.background ||
                        "rgba(255,255,255,.05)",

                      borderRadius:
                        feature.borderRadius || "20px",

                      boxShadow: feature.boxShadow
                        ? "0 20px 60px rgba(0,0,0,.25)"
                        : "none",
                    }}
                  >

                    {feature.icon && (
                      <img
                        src={urlFor(feature.icon).width(60).url()}
                        alt=""
                        className="feature-icon"
                      />
                    )}

                    {feature.title && (
                      <PortableText
                        value={feature.title}
                        components={portableComponents}
                      />
                    )}

                    {feature.description && (
                      <PortableText
                        value={feature.description}
                        components={portableComponents}
                      />
                    )}

                  </div>

                ))}

              </div>
            )}

          </div>

        </div>

        {/* ================= FLOATING CONTENT BLOCKS ================= */}

        {about.contentBlocks?.map((block) => (

          <div
            key={block._key}
            className={`content-box ${block.animation || ""}`}
            style={{
              position: "absolute",

              left: `${block.x || 0}px`,
              top: `${block.y || 0}px`,

              width: block.width || "380px",

              padding: block.padding || "24px",

              background:
                block.background ||
                "rgba(255,255,255,.05)",

              borderRadius:
                block.borderRadius || "20px",

              backdropFilter: block.backdropBlur
                ? `blur(${block.backdropBlur})`
                : "none",

              boxShadow: block.boxShadow
                ? "0 20px 60px rgba(0,0,0,.35)"
                : "none",
            }}
          >

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

            {block.type === "image" &&
              block.image && (
                <img
                  src={urlFor(block.image).width(500).url()}
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "15px",
                  }}
                />
              )}

            {block.type === "button" && (
              <a
                href={block.buttonLink || "#"}
                className="about-btn filled"
              >
                {block.buttonText}
              </a>
            )}

            {block.type === "statistics" &&
              block.statistics?.map((item, index) => (
                <div
                  key={index}
                  className="stat-item"
                >
                  {item.icon && (
                    <div className="stat-icon">
                      {item.icon}
                    </div>
                  )}

                  <h2>{item.number}</h2>

                  <h4>{item.label}</h4>
                </div>
              ))
            }

          </div>

        ))}
      </div>
    </section>
  );
}

/* ================= BUTTON COMPONENT ================= */

function AboutButton({ btn }) {
  return (
    <a
      href={btn.url || "#"}
      target={btn.openInNewTab ? "_blank" : "_self"}
      rel="noreferrer"
      className={`about-btn ${btn.variant || "filled"}`}
      style={{
        background:
          btn.variant === "filled"
            ? btn.backgroundColor || "var(--accent-color)"
            : "transparent",

        color: btn.textColor || "#ffffff",

        border:
          btn.variant === "outline"
            ? `2px solid ${btn.borderColor ||
            btn.textColor ||
            "#ffffff"
            }`
            : "none",

        padding:
          btn.buttonPadding ||
          "14px 28px",

        borderRadius:
          btn.buttonBorderRadius ||
          "30px",

        width:
          btn.buttonWidth || "auto",

        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",

        textDecoration: "none",
        fontWeight: 600,

        transition: ".3s",

        whiteSpace: "nowrap",
      }}
    >
      {btn.label}
    </a>
  );
}