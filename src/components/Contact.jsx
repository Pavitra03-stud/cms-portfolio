import "../styles/Contact.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";

/* ================= QUERY ================= */

const contactQuery = `*[_type == "contact"][0]{
  heading,
  description,
  
  contactItems[]{
    label,
    value,
    link,
    openInNewTab
  },
  layout,
  textAlign,
  backgroundColor,
  paddingTop,
  paddingBottom,
  formAlign,
  infoAlign,
  formWidth,
  headingColor,
descriptionColor,
labelColor,
valueColor,
formBackground,
inputBackground,
inputTextColor,
inputBorderColor,
buttonBackground,
buttonTextColor,
buttonHoverBackground,
cardBackground,
cardShadow,
  showSection
}`;

/* ================= PORTABLE TEXT ================= */

const portableComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
  },
  marks: {
    textColor: ({ value, children }) => (
      <span style={{ color: value?.color || "inherit" }}>
        {children}
      </span>
    ),
  },
};

/* ================= COMPONENT ================= */

const Contact = () => {

  const [contact, setContact] = useState(null);

  useEffect(() => {
    client.fetch(contactQuery).then((data) => {
      setContact(data);
    });
  }, []);

  if (!contact || !contact.showSection) return null;

  return (
    <section
      className="contact"
      id="contact"
      style={{
        backgroundColor: contact.backgroundColor || "#0f172a",
        paddingTop: contact.paddingTop || "100px",
        paddingBottom: contact.paddingBottom || "100px",
        textAlign: contact.textAlign || "left",
      }}
    >

      {/* ================= HEADING ================= */}
      <div
        className="contact-title"
        style={{
          color: contact.headingColor || "#2E241B",
        }}
      >
        <PortableText
          value={contact.heading}
          components={portableComponents}
        />
      </div>

      <div
        className="contact-wrapper"
        style={{
          flexDirection: contact.layout || "row",
        }}
      >

        {/* ================= LEFT SIDE ================= */}

        <div
          className="contact-left"
          style={{
            alignItems: contact.infoAlign || "flex-start",
          }}
        >

          {contact.description && (
            <div
              style={{
                color: contact.descriptionColor || "#666",
              }}
            >
              <PortableText
                value={contact.description}
                components={portableComponents}
              />
            </div>
          )}

          {/* ================= CONTACT ITEMS ================= */}

          {contact.contactItems?.map((item, index) => {

            let formattedLink = null;

            if (item.link) {
              if (
                item.link.startsWith("http") ||
                item.link.startsWith("mailto:") ||
                item.link.startsWith("tel:")
              ) {
                formattedLink = item.link;
              } else {
                formattedLink = `https://${item.link}`;
              }
            }

            /* ================= YOUTUBE ================= */

            if (item.label?.toLowerCase() === "youtube" && formattedLink) {

              const videoId =
                formattedLink.split("youtu.be/")[1]?.split("?")[0] ||
                formattedLink.split("v=")[1];

              return (
                <div key={index} className="contact-detail youtube-item">

                  <div
                    className="contact-label"
                    style={{
                      color: item.labelColor || "#2E241B",
                    }}
                  >
                    {item.label}:
                  </div>

                  <div className="contact-value youtube-video">
                    <iframe
                      width="100%"
                      height="220"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>

                </div>
              );
            }

            /* ================= GOOGLE MAP ================= */

            if (
              (item.label?.toLowerCase() === "location" ||
                item.label?.toLowerCase() === "address") &&
              item.link
            ) {

              return (
                <div key={index} className="contact-detail map-item">

                  <div
                    className="contact-label"
                    style={{
                      color: item.labelColor || "#2E241B",
                    }}
                  >
                    {item.label}:
                  </div>

                  <div className="contact-value map-embed">

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >

                      <iframe
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src="https://maps.google.com/maps?q=india&z=3&output=embed"
                      ></iframe>

                      <div className="map-overlay">
                        Open Location
                      </div>

                    </a>

                  </div>

                </div>
              );
            }

            /* ================= NORMAL CONTACT ITEMS ================= */

            return (
              <div key={index} className="contact-detail">

                <div
                  className="contact-label"
                  style={{
                    color: item.labelColor || "#2E241B",
                  }}
                >
                  {item.label}:
                </div>

                <div
                  className="contact-value"
                  style={{
                    color: item.valueColor || "#555555",
                  }}
                >

                  {formattedLink ? (

                    <a
                      href={formattedLink}
                      target={item.openInNewTab ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="contact-link"
                    >

                      {item.value ? (
                        <PortableText
                          value={item.value}
                          components={portableComponents}
                        />
                      ) : (
                        formattedLink
                      )}

                    </a>

                  ) : (

                    item.value && (
                      <PortableText
                        value={item.value}
                        components={portableComponents}
                      />
                    )

                  )}

                </div>

              </div>
            );

          })}

        </div>

        {/* ================= CONTACT FORM ================= */}

        <div
          className="contact-form-wrapper"
          style={{
            justifyContent: contact.formAlign || "flex-start",
          }}
        >

          <form
            className="contact-form"
            style={{
              width: contact.formWidth || "100%",
              background: contact.formBackground || "#fff",
              boxShadow:
                contact.cardShadow ||
                "0 20px 50px rgba(0,0,0,.12)",
            }}
          >

            <input
              type="text"
              placeholder="Your Name"
              required
              style={{
                background: contact.inputBackground || "#FAF7F2",
                color: contact.inputTextColor || "#2B2B2B",
                border: `1px solid ${contact.inputBorderColor || "#E5D3B3"}`
              }}
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              style={{
                background: contact.inputBackground || "#FAF7F2",
                color: contact.inputTextColor || "#2B2B2B",
                border: `1px solid ${contact.inputBorderColor || "#E5D3B3"}`
              }}
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              required
              style={{
                background: contact.inputBackground || "#FAF7F2",
                color: contact.inputTextColor || "#2B2B2B",
                border: `1px solid ${contact.inputBorderColor || "#E5D3B3"}`
              }}
            ></textarea>
            <button
              type="submit"
              className="primary-btn"
              style={{
                background: contact.buttonBackground || "#C79A3B",
                color: contact.buttonTextColor || "#fff",
              }}
            ></button>

          </form>

        </div>


      </div>

    </section>
  );
};

export default Contact;
