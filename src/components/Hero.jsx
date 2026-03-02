
// import "../styles/Hero.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import imageUrlBuilder from "@sanity/image-url";
// import { PortableText } from "@portabletext/react";

// const builder = imageUrlBuilder(client);
// const urlFor = (src) => builder.image(src);

// /* ================= QUERY ================= */
// const heroQuery = `*[_type=="hero"][0]{
//   name,
//   role,
//   tagline,
//   heroImage,
//   imageShape,
//   "resumeUrl": resumeFile.asset->url,
//   showSection
// }`;

// /* ================= PORTABLE TEXT COMPONENTS ================= */
// const portableComponents = {
//   block: {
//     normal: ({ children }) => <p>{children}</p>,
//     h1: ({ children }) => <h1>{children}</h1>,
//     h2: ({ children }) => <h2>{children}</h2>,
//     h3: ({ children }) => <h3>{children}</h3>,
//     blockquote: ({ children }) => (
//       <blockquote className="hero-quote">{children}</blockquote>
//     ),
//   },

//   marks: {
//     strong: ({ children }) => <strong>{children}</strong>,
//     em: ({ children }) => <em>{children}</em>,

//     underline: ({ children }) => (
//       <span style={{ textDecoration: "underline" }}>{children}</span>
//     ),

//     "strike-through": ({ children }) => (
//       <span style={{ textDecoration: "line-through" }}>{children}</span>
//     ),

//     code: ({ children }) => (
//       <code className="hero-code">{children}</code>
//     ),

//     textColor: ({ value, children }) => {
//       const colors = {
//         accent: "var(--accent-color)",
//         blue: "#60a5fa",
//         pink: "#ff7ab6",
//         white: "#ffffff",
//         black: "#000000",
//       };

//       return (
//         <span style={{ color: colors[value?.color] || "inherit" }}>
//           {children}
//         </span>
//       );
//     },

//     fontSize: ({ value, children }) => (
//       <span style={{ fontSize: value?.size || "inherit" }}>
//         {children}
//       </span>
//     ),

//     fontFamily: ({ value, children }) => (
//       <span style={{ fontFamily: value?.family || "inherit" }}>
//         {children}
//       </span>
//     ),
//   },
// };

// const Hero = () => {
//   const [hero, setHero] = useState(null);

//   useEffect(() => {
//     client.fetch(heroQuery).then((data) => {
//       console.log("HERO DATA ", data);
//       setHero(data);
//     });
//   }, []);

//   if (!hero || !hero.showSection) return null;

//   return (
//     <section className="hero" id="home">

//       {/* ================= IMAGE ================= */}
//       {hero.heroImage && (
//         <img
//           src={urlFor(hero.heroImage).width(420).url()}
//           alt="Profile"
//           className={`hero-img ${hero.imageShape || "circle"}`}
//         />
//       )}

//       {/* ================= NAME ================= */}
//       {hero.name && (
//         <div className="hero-name">
//           <PortableText
//             value={hero.name}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ================= ROLE ================= */}
//       {hero.role && (
//         <div className="hero-role">
//           <PortableText
//             value={hero.role}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ================= TAGLINE ================= */}
//       {hero.tagline && (
//         <div className="hero-tagline">
//           <PortableText
//             value={hero.tagline}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ================= BUTTONS ================= */}
//       <div className="hero-buttons">
//         <a href="#contact" className="primary-btn">
//           Connect with me
//         </a>

//         {hero.resumeUrl && (
//           <a
//             href={hero.resumeUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="secondary-btn"
//           >
//             My Resume
//           </a>
//         )}
//       </div>

//     </section>
//   );
// };

// export default Hero;



import "../styles/Hero.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (src) => builder.image(src);

/* ================= QUERY ================= */
const heroQuery = `*[_type=="hero"][0]{
  name,
  role,
  tagline,
  heroImage,
  imageShape,
  imagePosition,
  textAlign,
  backgroundColor,
  "resumeUrl": resumeFile.asset->url,
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

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    client.fetch(heroQuery).then(setHero);
  }, []);

  if (!hero?.showSection) return null;

  return (
    <section
      className="hero"
      id="home"
      style={{
        backgroundColor: hero.backgroundColor || "#0f172a",
      }}
    >
      <div className="hero-container">
        <div
          className={`hero-content
            ${hero.imagePosition === "right" ? "reverse" : ""}
            ${hero.imagePosition === "top" ? "column" : ""}
            ${hero.imagePosition === "bottom" ? "column-reverse" : ""}
          `}
        >
          {/* ===== IMAGE ===== */}
          {hero.heroImage && (
            <div className="hero-image-wrapper">
              <img
                src={urlFor(hero.heroImage).width(500).url()}
                alt="Profile"
                className={`hero-img ${hero.imageShape || "circle"}`}
              />
            </div>
          )}

          {/* ===== TEXT BLOCK ===== */}
          <div
            className="hero-text"
            style={{
              textAlign: hero.textAlign || "left",
            }}
          >
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

            {/* ===== BUTTONS ===== */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;