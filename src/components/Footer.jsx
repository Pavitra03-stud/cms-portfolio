import "../styles/Footer.css";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

/* ==========================================================
   GROQ QUERY
========================================================== */

const footerQuery = `*[_type == "footer"][0]{

  showFooter,
  layout,

  logo,
  companyName,
  companyDescription,

  quickLinks[]{
    title,
    link,
    openInNewTab
  },

  contactItems[]{
    label,
    value,
    link
  },

  socialLinks[]{
    platform,
    url
  },

  showNewsletter,
  newsletterHeading,
  newsletterDescription,
  placeholder,
  buttonText,

  backgroundColor,
  textColor,
  headingColor,
  linkColor,
  linkHoverColor,
  borderColor,

  iconColor,
  iconHoverColor,

  buttonBackground,
  buttonTextColor,

  inputBackground,
  inputTextColor,
  inputBorderColor,

  copyrightText,

  showBackToTop,
  backToTopText,

  paddingTop,
  paddingBottom,
  columnGap,

  borderTop,
  shadow

}`;

/* ==========================================================
   PORTABLE TEXT
========================================================== */

const portableComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
};

/* ==========================================================
   COMPONENT
========================================================== */

export default function Footer() {

  const [footer, setFooter] = useState(null);

  useEffect(() => {

    client.fetch(footerQuery).then((data) => {
      setFooter(data);
    });

  }, []);

  if (!footer || !footer.showFooter) return null;

  return (

    <footer

      className={`footer footer-${footer.layout}`}

      style={{
        background: footer.backgroundColor,
        color: footer.textColor,

        paddingTop: footer.paddingTop,
        paddingBottom: footer.paddingBottom,

        borderTop: footer.borderTop
          ? `1px solid ${footer.borderColor}`
          : "none",

        boxShadow: footer.shadow
          ? "0 10px 35px rgba(0,0,0,.25)"
          : "none",
      }}

    >

      <div
        className="footer-container"
        style={{
          gap: footer.columnGap,
        }}
      >
        {/* ==========================================================
          COMPANY
      ========================================================== */}

        <div className="footer-column">

          {footer.logo && (
            <img
              src={urlFor(footer.logo).url()}
              alt={footer.companyName}
              className="footer-logo"
            />
          )}

          <h3
            style={{
              color: footer.headingColor,
            }}
          >
            {footer.companyName}
          </h3>

          {footer.companyDescription && (
            <div
              className="footer-description"
              style={{
                color: footer.textColor,
              }}
            >
              <PortableText
                value={footer.companyDescription}
                components={portableComponents}
              />
            </div>
          )}

        </div>

        {/* ==========================================================
          QUICK LINKS
      ========================================================== */}

        <div className="footer-column">

          <h3
            style={{
              color: footer.headingColor,
            }}
          >
            Quick Links
          </h3>

          <ul className="footer-links">

            {footer.quickLinks?.map((item, index) => (

              <li key={index}>

                <a
                  href={item.link}
                  target={item.openInNewTab ? "_blank" : "_self"}
                  rel="noreferrer"
                  style={{
                    color: footer.linkColor,
                  }}
                >
                  {/* {item.title} */}
                  {item.title?.[0]?.children?.map((child) => child.text).join("")}
                </a>

              </li>

            ))}

          </ul>

        </div>

        {/* ==========================================================
          CONTACT
      ========================================================== */}

        <div className="footer-column">

          <h3
            style={{
              color: footer.headingColor,
            }}
          >
            Contact
          </h3>

          <ul className="footer-contact">

            {footer.contactItems?.map((item, index) => (

              <li key={index}>

                <strong>{item.label}</strong>

                <br />

                {item.link ? (

                  <a
                    href={item.link}
                    style={{
                      color: footer.linkColor,
                    }}
                  >
                    {item.value}
                  </a>

                ) : (

                  <span>{item.value}</span>

                )}

              </li>

            ))}

          </ul>

        </div>

        {/* ==========================================================
          SOCIAL
      ========================================================== */}

        <div className="footer-column">

          <h3
            style={{
              color: footer.headingColor,
            }}
          >
            Follow Us
          </h3>

          <div className="footer-social">

            {footer.socialLinks?.map((item, index) => (

              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                title={item.platform}
                style={{
                  color: footer.iconColor,
                }}
              >
                {item.platform}
              </a>

            ))}

          </div>

        </div>
        {/* ==========================================================
          NEWSLETTER
      ========================================================== */}

        {footer.showNewsletter && (

          <div className="footer-column">

            <h3
              style={{
                color: footer.headingColor,
              }}
            >
              {footer.newsletterHeading}
            </h3>

            {/* <p
            style={{
              color: footer.textColor,
            }}
          >
            {footer.newsletterDescription}
          </p> */}
            <div
              className="footer-description"
              style={{
                color: footer.textColor,
              }}
            >
              <PortableText
                value={footer.newsletterDescription}
                components={portableComponents}
              />
            </div>

            <form className="footer-newsletter">

              <input
                type="email"
                placeholder={footer.placeholder}
                style={{
                  background: footer.inputBackground,
                  color: footer.inputTextColor,
                  border: `1px solid ${footer.inputBorderColor}`,
                }}
              />

              <button
                type="submit"
                style={{
                  background: footer.buttonBackground,
                  color: footer.buttonTextColor,
                }}
              >
                {footer.buttonText}
              </button>

            </form>

          </div>

        )}

      </div>

      {/* ==========================================================
          COPYRIGHT
      ========================================================== */}

      <div
        className="footer-bottom"
        style={{
          borderTop: `1px solid ${footer.borderColor}`,
        }}
      >

        {/* <p
          style={{
            color: footer.textColor,
          }}
        >
          {footer.copyrightText}
        </p> */}
        <div
  className="footer-copyright"
  style={{
    color: footer.textColor,
  }}
>
  <PortableText
    value={footer.copyrightText}
    components={portableComponents}
  />
</div>

        {footer.showBackToTop && (

          <button
            className="back-to-top"
            title={footer.backToTopText}
            style={{
              background: footer.buttonBackground,
              color: footer.buttonTextColor,
            }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            ↑
          </button>

        )}

      </div>

    </footer>

  );

}