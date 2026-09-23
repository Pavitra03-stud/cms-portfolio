import "../styles/Services.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

/* ================= QUERY ================= */
const servicesQuery = `*[_type=="services"][0]{

  heading,
  description,

  headingAlign,
  textAlign,

  layout,
  cardAlign,

  backgroundColor,
  "backgroundImageUrl": backgroundImage.asset->url,
  useBackgroundImage,
  showOverlay,
  overlayColor,
  sectionHeight,
  backgroundPosition,
  backgroundSize,

  enableContentBox,
  boxBackground,
  backdropBlur,
  boxPadding,
  boxBorderRadius,
  boxShadow,

  cardWidth,
  cardHeight,
  cardGap,
  cardBackground,
  cardBorderRadius,
  cardBorder,
  cardShadow,
  cardPadding,
  cardHover,
  cardVerticalAlign,

  buttons,
  buttonPosition,

  servicesList[]{
    serviceImage,
    showImage,
    imagePosition,
    imageShape,

    imageWidth,
    imageHeight,
    imageBorderRadius,
    imageBorder,
    imageShadow,
    imageObjectFit,

    showBadge,
    badgeText,
    badgeColor,

    serviceTitle,
    serviceDescription,

    cardBackground,
    cardBorderRadius,
    cardShadow,
    cardAnimation,

    showButton,
    buttonText,
    buttonLink,
    buttonStyle,
    buttonColor,
    buttonPosition,
    buttonWidth,
    buttonPadding,
    buttonBorderRadius
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
      <blockquote className="services-quote">{children}</blockquote>
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
      <code className="services-code">{children}</code>
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

const Services = () => {
  const [services, setServices] = useState(null);

  useEffect(() => {
    client.fetch(servicesQuery).then((data) => {
      console.log("SERVICES DATA:", data);
      setServices(data);
    });
  }, []);

  if (!services?.showSection) return null;

  return (
    <section
      className="services"
      id="services"
      style={{
        minHeight: services.sectionHeight || "100vh",

        backgroundColor:
          services.backgroundColor,

        backgroundImage:
          services.useBackgroundImage &&
            services.backgroundImageUrl
            ? `url(${services.backgroundImageUrl})`
            : "none",

        backgroundSize:
          services.backgroundSize || "cover",

        backgroundPosition:
          services.backgroundPosition || "center",

        backgroundRepeat: "no-repeat",

        position: "relative",
      }}
    >
      {services.showOverlay && (

        <div
          className="services-overlay"
          style={{
            background:
              services.overlayColor ||
              "rgba(0,0,0,.35)",
          }}
        />

      )}
      <div className="services-container">
        <div
          className="services-content-box"
          style={{
            background: services.enableContentBox
              ? services.boxBackground
              : "transparent",

            backdropFilter: services.enableContentBox
              ? `blur(${services.backdropBlur})`
              : "none",

            padding: services.enableContentBox
              ? services.boxPadding
              : "0",

            borderRadius:
              services.boxBorderRadius || "20px",

            boxShadow:
              services.enableContentBox &&
                services.boxShadow
                ? "0 20px 60px rgba(0,0,0,.35)"
                : "none",
          }}
        >

          {/* ===== HEADING ===== */}

          {services.heading && (
            <div
              className="services-title"
              style={{
                textAlign:
                  services.headingAlign || "center",
              }}
            >
              <PortableText
                value={services.heading}
                components={portableComponents}
              />
            </div>
          )}

          {/* ===== DESCRIPTION ===== */}

          {services.description && (
            <div
              className="services-description"
              style={{
                textAlign:
                  services.textAlign || "center",
              }}
            >
              <PortableText
                value={services.description}
                components={portableComponents}
              />
            </div>
          )}
          {/* ===== SECTION BUTTONS ===== */}

          {services.buttons?.length > 0 && (
            <div
              className="services-section-buttons"
              style={{
                display: "flex",
                gap: "16px",
                justifyContent:
                  services.buttonPosition === "center"
                    ? "center"
                    : services.buttonPosition === "right"
                      ? "flex-end"
                      : "flex-start",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >
              {services.buttons.map((btn, index) => (
                <a
                  key={index}
                  href={btn.url || "#"}
                  target={btn.openInNewTab ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={`service-btn ${btn.variant || "filled"}`}
                  style={{
                    background:
                      btn.variant === "filled"
                        ? btn.backgroundColor || "#D4A64A"
                        : "transparent",

                    color:
                      btn.textColor || "#ffffff",

                    border:
                      btn.variant === "outline"
                        ? `2px solid ${btn.borderColor || "#D4A64A"}`
                        : "none",

                    padding: "14px 28px",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}

        </div>


        {/* ===== SERVICES GRID ===== */}

        <div
          className="services-grid"
          style={{
            display: "grid",

            gridTemplateColumns:
              services.layout === "single"
                ? "1fr"
                : services.layout === "twoColumn"
                  ? "repeat(2, minmax(320px,1fr))"
                  : "repeat(3, minmax(300px,1fr))",

            gap: services.cardGap || "30px",

            justifyItems:
              services.cardAlign === "flex-start"
                ? "start"
                : services.cardAlign === "flex-end"
                  ? "end"
                  : "center",

            alignItems:
              services.cardVerticalAlign || "flex-start",
          }}
        >          {services.servicesList?.map((item, index) => {
          const position = item.imagePosition || "top";

          return (
            <div
              className={`service-card ${position} ${item.cardAnimation || ""}`}
              key={index}
              style={{
                width: services.cardWidth || "350px",

                minHeight: services.cardHeight || "500px",

                background:
                  item.cardBackground ||
                  services.cardBackground ||
                  "#ffffff",

                borderRadius:
                  item.cardBorderRadius ||
                  services.cardBorderRadius ||
                  "20px",

                border:
                  services.cardBorder || "none",

                padding:
                  services.cardPadding || "24px",

                boxShadow:
                  item.cardShadow ?? services.cardShadow
                    ? "0 20px 50px rgba(0,0,0,.15)"
                    : "none",
              }}
            >
              {item.showBadge && (
                <div
                  className="service-badge"
                  style={{
                    background: item.badgeColor || "#D4A64A",
                  }}
                >
                  {item.badgeText}
                </div>
              )}
              {/* ===== IMAGE ===== */}
              {item.showImage && item.serviceImage?.asset && (
                <div
                  className={`service-image-wrapper ${item.imageShape || "rectangle"
                    }`}
                >
                  <img
                    src={urlFor(item.serviceImage).width(800).url()}
                    alt="Service"
                    className="service-img"
                    style={{
                      width: item.imageWidth || "100%",

                      height: item.imageHeight || "220px",

                      objectFit:
                        item.imageObjectFit || "cover",

                      border:
                        item.imageBorder || "none",

                      borderRadius:
                        item.imageBorderRadius || "16px",

                      boxShadow:
                        item.imageShadow
                          ? "0 10px 30px rgba(0,0,0,.2)"
                          : "none",
                    }}
                  />
                </div>
              )}

              {/* ===== TEXT AREA ===== */}
              <div className="service-content">
                <span className="service-id">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* TITLE */}
                {item.serviceTitle && (
                  <div className="service-title">
                    <PortableText
                      value={item.serviceTitle}
                      components={portableComponents}
                    />
                  </div>
                )}

                {/* DESCRIPTION */}
                {item.serviceDescription && (
                  <div className="service-text">
                    <PortableText
                      value={item.serviceDescription}
                      components={portableComponents}
                    />
                  </div>
                )}
                {/* ===== SECTION BUTTONS ===== */}

{services.buttons?.length > 0 && (
  <div
    className={`services-buttons ${services.buttonPosition || "center"}`}
  >
    {services.buttons.map((btn) => (
      <ServiceButton key={btn._key} btn={btn} />
    ))}
  </div>
)}

                {/* ===== BUTTON ===== */}
                {item.showButton && item.buttonText && (
                  <div
                    className={`service-button-wrapper ${item.buttonPosition || "center"
                      }`}
                  >
                    <a
                      href={item.buttonLink || "#"}
                      className={`service-btn ${item.buttonStyle || "primary"
                        }`}
                      style={{
                        backgroundColor:
                          item.buttonStyle === "primary"
                            ? item.buttonColor || "#6366f1"
                            : "transparent",

                        border:
                          `2px solid ${item.buttonColor || "#6366f1"}`,

                        color:
                          item.buttonStyle === "outline"
                            ? item.buttonColor || "#6366f1"
                            : "#ffffff",

                        width:
                          item.buttonWidth || "auto",

                        padding:
                          item.buttonPadding || "12px 24px",

                        borderRadius:
                          item.buttonBorderRadius || "30px",

                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",

                        textDecoration: "none",
                        transition: ".3s ease",
                      }}
                    >
                      {item.buttonText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default Services;