

// // import "../styles/About.css";
// // import { useEffect, useState } from "react";
// // import client from "../sanityClient";
// // import imageUrlBuilder from "@sanity/image-url";
// // import { PortableText } from "@portabletext/react";

// // const builder = imageUrlBuilder(client);
// // const urlFor = (src) => builder.image(src);

// // const aboutQuery = `*[_type == "about"][0]{
// //   heading,
// //   description,
// //   profileImage,
// //   imageShape,
// //   imagePosition,
// //   textAlign,
// //   backgroundColor,
// //   showSection
// // }`;

// // const portableComponents = {
// //   block: {
// //     normal: ({ children }) => <p>{children}</p>,
// //     h1: ({ children }) => <h1>{children}</h1>,
// //     h2: ({ children }) => <h2>{children}</h2>,
// //     h3: ({ children }) => <h3>{children}</h3>,
// //   },
// //   marks: {
// //     strong: ({ children }) => <strong>{children}</strong>,
// //     em: ({ children }) => <em>{children}</em>,
// //     underline: ({ children }) => (
// //       <span style={{ textDecoration: "underline" }}>{children}</span>
// //     ),
// //     "strike-through": ({ children }) => (
// //       <span style={{ textDecoration: "line-through" }}>{children}</span>
// //     ),
// //     textColor: ({ value, children }) => {
// //       const colors = {
// //         accent: "var(--accent-color)",
// //         blue: "#60a5fa",
// //         pink: "#ff7ab6",
// //         white: "#ffffff",
// //         black: "#000000",
// //       };
// //       return (
// //         <span style={{ color: colors[value?.color] || "inherit" }}>
// //           {children}
// //         </span>
// //       );
// //     },
// //   },
// // };

// // const About = () => {
// //   const [about, setAbout] = useState(null);

// //   // useEffect(() => {
// //   //   client.fetch(aboutQuery).then(setAbout);
// //   // }, []);

// //   useEffect(() => {
// //   client.fetch(aboutQuery).then((data) => {
// //     console.log("ABOUT DATA 👉", data);
// //     setAbout(data);
// //   });
// // }, []);

// //   if (!about?.showSection) return null;

// //   return (
// //     <section className="about" id="about">

// //       {/* HEADING */}
// //       {about.heading && (
// //         <div className="about-title">
// //           <PortableText
// //             value={about.heading}
// //             components={portableComponents}
// //           />
// //         </div>
// //       )}

// //       <div className="about-content">

// //         {/* IMAGE */}
// //         {about.profileImage && (
// //           <div className="about-image-wrapper">
// //             <img
// //               src={urlFor(about.profileImage).width(500).url()}
// //               alt="About"
// //               className={`about-img ${about.imageShape || "circle"}`}
// //             />
// //           </div>
// //         )}

// //         {/* DESCRIPTION */}
// //         {about.description && (
// //           <div className="about-text">
// //             <PortableText
// //               value={about.description}
// //               components={portableComponents}
// //             />
// //           </div>
// //         )}

// //       </div>
// //     </section>
// //   );
// // };

// // export default About;



// import "../styles/About.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import imageUrlBuilder from "@sanity/image-url";
// import { PortableText } from "@portabletext/react";

// const builder = imageUrlBuilder(client);
// const urlFor = (src) => builder.image(src);

// /* ================= PORTABLE TEXT CONFIG ================= */
// const portableComponents = {
//   block: {
//     normal: ({ children }) => <p>{children}</p>,
//     h1: ({ children }) => <h1>{children}</h1>,
//     h2: ({ children }) => <h2>{children}</h2>,
//     h3: ({ children }) => <h3>{children}</h3>,
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

// /* ================= SANITY QUERY ================= */
// const aboutQuery = `*[_type == "about"][0]{
//   heading,
//   description,
//   profileImage,
//   imageShape,
//   imagePosition,
//   textAlign,
//   headingAlign,
//   backgroundColor,
//   showSection
// }`;

// const About = () => {
//   const [about, setAbout] = useState(null);

//   useEffect(() => {
//     client.fetch(aboutQuery).then(setAbout);
//   }, []);

//   if (!about?.showSection) return null;

//   return (
//     <section
//       className="about"
//       id="about"
//       style={{
//         backgroundColor: about.backgroundColor || "#0f172a",
//       }}
//     >
//       {/* ================= HEADING ================= */}
//     {/* ================= HEADING ================= */}
// {/* ================= HEADING ================= */}
// {about.heading && (
//   <div
//     className="about-title"
//     style={{
//       display: "flex",
//       justifyContent:
//         about.headingAlign === "left"
//           ? "flex-start"
//           : about.headingAlign === "right"
//           ? "flex-end"
//           : "center",
//       width: "100%",
//     }}
//   >
//     <div style={{ textAlign: about.headingAlign || "center" }}>
//       <PortableText
//         value={about.heading}
//         components={portableComponents}
//       />
//     </div>
//   </div>
// )}
//       {/* ================= CONTENT LAYOUT ================= */}
//       <div
//         className={`about-content ${
//           about.imagePosition === "right" ? "reverse" : ""
//         } ${
//           about.imagePosition === "top"
//             ? "column"
//             : about.imagePosition === "bottom"
//             ? "column-reverse"
//             : ""
//         }`}
//         style={{ textAlign: about.textAlign || "left" }}
//       >
//         {/* IMAGE */}
//         {about.profileImage && (
//           <div className="about-image-wrapper">
//             <img
//               src={urlFor(about.profileImage).width(500).url()}
//               alt="About"
//               className={`about-img ${about.imageShape || "circle"}`}
//             />
//           </div>
//         )}

//         {/* DESCRIPTION */}
//         {about.description && (
//           <div className="about-text">
//             <PortableText
//               value={about.description}
//               components={portableComponents}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default About;

import "../styles/About.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (src) => builder.image(src);

const aboutQuery = `*[_type == "about"][0]{
  heading,
  description,
  profileImage,
  imageShape,
  imagePosition,
  textAlign,
  backgroundColor,
  showSection
}`;

/* 🔥 IMPORTANT: Tell PortableText how to render headings */
const portableComponents = {
  block: {
    h1: ({ children }) => <h1 className="about-heading">{children}</h1>,
    h2: ({ children }) => <h2 className="about-heading">{children}</h2>,
    h3: ({ children }) => <h3 className="about-heading">{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
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
        backgroundColor: about.backgroundColor || "#0f172a",
      }}
    >
      {/* ===== HEADING ===== */}
      <div
        className={`about-title ${about.textAlign || "center"}`}
      >
        {about.heading && (
          <PortableText
            value={about.heading}
            components={portableComponents}
          />
        )}
      </div>

      {/* ===== CONTENT LAYOUT ===== */}
      <div
        className={`about-content 
          ${about.imagePosition === "right" ? "reverse" : ""}
          ${about.imagePosition === "top" ? "column" : ""}
          ${about.imagePosition === "bottom" ? "column-reverse" : ""}
        `}
      >
        {/* IMAGE */}
        {about.profileImage && (
          <div className="about-image-wrapper">
            <img
              src={urlFor(about.profileImage).width(500).url()}
              alt="About"
              className={`about-img ${about.imageShape || "circle"}`}
            />
          </div>
        )}

        {/* DESCRIPTION */}
        {about.description && (
          <div className="about-text">
            <PortableText value={about.description} />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;