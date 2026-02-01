import "../styles/About.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const aboutQuery = `*[_type=="about"][0]{
  heading,
  description,
  profileImage,
  showSection,
  typography{
    fontFamily,
    fontSize,
    headingColor,
    textColor
  }
}`;

const builder = imageUrlBuilder(client);
const urlFor = (src) => builder.image(src);

/* 🔑 SAME COLOR LOGIC AS SERVICES & CONTACT */
const portableComponents = {
  marks: {
    textColor: ({ value, children }) => {
      const colors = {
        accent: "var(--accent-color)",
        blue: "#60a5fa",
        pink: "#ff7ab6",
        white: "#ffffff",
      };
      return <span style={{ color: colors[value.color] }}>{children}</span>;
    },
  },
};

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    client.fetch(aboutQuery).then(setAbout);
  }, []);

  if (!about?.showSection) return null;

  return (
    <section
      className="about"
      id="about"
      style={{
        fontFamily: about.typography?.fontFamily,
        fontSize: about.typography?.fontSize,
        color: about.typography?.textColor,
      }}
    >
      {/* HEADING */}
      <h2
        className="about-title"
        style={{ color: about.typography?.headingColor }}
      >
        {about.heading?.split(" ")[0]}{" "}
        <span>{about.heading?.split(" ").slice(1).join(" ")}</span>
      </h2>

      <div className="about-content">
        {about.profileImage && (
          <div className="about-image-wrapper">
            <img
              src={urlFor(about.profileImage).width(500).url()}
              alt="About"
              className="about-img"
            />
          </div>
        )}

        {/* ✅ PORTABLE TEXT DESCRIPTION */}
        <div className="about-text">
          <PortableText
            value={about.description}
            components={portableComponents}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
