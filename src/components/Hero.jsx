import "../styles/Hero.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (src) => builder.image(src);

const heroQuery = `*[_type=="hero"][0]{
  name,
  role,
  tagline,
  heroImage,
  "resumeUrl": resumeFile.asset->url,
  showSection
}`;

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

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    client.fetch(heroQuery).then(setHero);
  }, []);

  if (!hero?.showSection) return null;

  return (
    <section className="hero" id="home">
      {hero.heroImage && (
        <img
          src={urlFor(hero.heroImage).width(420).url()}
          alt="Profile"
          className="hero-img"
        />
      )}

      <h1>{hero.name}</h1>
      <h2>{hero.role}</h2>

      <PortableText
        value={hero.tagline}
        components={portableComponents}
      />

      <div className="hero-buttons">
        <a href="#contact" className="primary-btn">
          Connect with me
        </a>

        {hero.resumeUrl && (
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="secondary-btn"
          >
            My Resume
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
