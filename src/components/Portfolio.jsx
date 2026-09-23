// import "../styles/Portfolio.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import imageUrlBuilder from "@sanity/image-url";
// import { PortableText } from "@portabletext/react";

// const builder = imageUrlBuilder(client);
// const urlFor = (source) => builder.image(source);

// /* ================= QUERY ================= */
// const portfolioQuery = `*[_type=="portfolio"][0]{

//   heading,
//   description,

//   headingAlign,
//   textAlign,

//   gridLayout,

//   backgroundColor,
//   "backgroundImageUrl": backgroundImage.asset->url,
//   useBackgroundImage,
//   showOverlay,
//   overlayColor,
//   sectionHeight,
//   backgroundPosition,
//   backgroundSize,

//   cardWidth,
//   cardHeight,
//   cardGap,
//   cardBackground,
//   cardBorderRadius,
//   cardBorder,
//   cardShadow,
//   cardPadding,
//   cardHover,

//   projects[]{
//     title,
//     description,

//     image,
//     showImage,

//     imageShape,
//     imageWidth,
//     imageHeight,
//     imageBorderRadius,
//     imageBorder,
//     imageShadow,
//     imageObjectFit,

//     showBadge,
//     badgeText,
//     badgeColor,

//     location,
//     category,
//     completionDate,
//     client,

//     showButton,
//     buttonText,
//     buttonLink,
//     buttonStyle,
//     buttonColor,
//     buttonPosition,
//     sectionHeight,
//     sectionPadding,
//     maxWidth,
//     backgroundPosition,
//     backgroundSize,

//     showProject
//   },

//   showSection
// }`;

// /* ================= PORTABLE TEXT ================= */
// const portableComponents = {
//   block: {
//     normal: ({ children }) => <p>{children}</p>,
//     h1: ({ children }) => <h1>{children}</h1>,
//     h2: ({ children }) => <h2>{children}</h2>,
//     h3: ({ children }) => <h3>{children}</h3>,
//     blockquote: ({ children }) => (
//       <blockquote className="portfolio-quote">{children}</blockquote>
//     ),
//   },
// };

// const Portfolio = () => {
//   const [portfolio, setPortfolio] = useState(null);

//   useEffect(() => {
//     client.fetch(portfolioQuery).then(setPortfolio);
//   }, []);

//   if (!portfolio?.showSection) return null;

//   return (
//     <section
//       className="portfolio"
//       id="projects"
//       style={{
//         minHeight: portfolio.sectionHeight || "100vh",
//         padding: portfolio.sectionPadding,

//         backgroundColor: portfolio.backgroundColor,

//         backgroundImage:
//           portfolio.useBackgroundImage &&
//             portfolio.backgroundImageUrl
//             ? `url(${portfolio.backgroundImageUrl})`
//             : "none",

//         backgroundSize:
//           portfolio.backgroundSize || "cover",

//         backgroundPosition:
//           portfolio.backgroundPosition || "center",

//         backgroundRepeat: "no-repeat",

//         position: "relative",
//       }}
//     >
//       {portfolio.showOverlay && (
//         <div
//           className="portfolio-overlay"
//           style={{
//             background:
//               portfolio.overlayColor ||
//               "rgba(0,0,0,.4)",
//           }}
//         />
//       )}
//       {portfolio.description && (

//         <div
//           className="portfolio-description"
//           style={{
//             textAlign:
//               portfolio.textAlign || "center",
//           }}
//         >

//           <PortableText
//             value={portfolio.description}
//             components={portableComponents}
//           />

//         </div>

//       )}
//       {/* ================= HEADING ================= */}
//       {portfolio.heading && (
//         <div
//           className={`portfolio-title ${portfolio.headingAlign || "center"
//             }`}
//         >
//           <PortableText
//             value={portfolio.heading}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ================= GRID ================= */}
//       <div
//         className={`portfolio-grid ${portfolio.gridLayout || "three"}`}
//         style={{
//           gap: portfolio.cardGap || "30px",
//         }}
//       >
//         {portfolio.projects
//           ?.filter((project) => project.showProject)
//           .map((project) => (
//             <div
//               key={project._key}
//               className={`portfolio-card ${portfolio.cardHover || ""}`}
//               style={{
//                 width: portfolio.cardWidth || "360px",
//                 minHeight: portfolio.cardHeight || "420px",
//                 background: portfolio.cardBackground || "#ffffff",
//                 borderRadius: portfolio.cardBorderRadius || "20px",
//                 border: portfolio.cardBorder || "none",
//                 padding: portfolio.cardPadding || "24px",
//                 boxShadow: portfolio.cardShadow
//                   ? "0 15px 40px rgba(0,0,0,.18)"
//                   : "none",
//               }}
//             >
//               {/* ===== BADGE ===== */}
//               {project.showBadge && (
//                 <span
//                   className="project-badge"
//                   style={{
//                     background: project.badgeColor || "#D4A64A",
//                   }}
//                 >
//                   {project.badgeText}
//                 </span>
//               )}

//               {/* ===== IMAGE ===== */}
//               {project.showImage && project.image?.asset && (
//                 <div
//                   className={`portfolio-image-wrapper ${project.imageShape || "rectangle"
//                     }`}
//                 >
//                   <img
//                     src={urlFor(project.image).url()}
//                     alt="Project"
//                     style={{
//                       width: project.imageWidth || "100%",
//                       height: project.imageHeight || "240px",
//                       objectFit: project.imageObjectFit || "cover",
//                       borderRadius: project.imageBorderRadius || "16px",
//                       border: project.imageBorder || "none",
//                       boxShadow: project.imageShadow
//                         ? "0 10px 25px rgba(0,0,0,.2)"
//                         : "none",
//                     }}
//                   />
//                 </div>
//               )}

//               {/* ===== TITLE ===== */}
//               {project.title && (
//                 <div className="project-title">
//                   <PortableText
//                     value={project.title}
//                     components={portableComponents}
//                   />
//                 </div>
//               )}

//               {/* ===== DESCRIPTION ===== */}
//               {project.description && (
//                 <div className="project-description">
//                   <PortableText
//                     value={project.description}
//                     components={portableComponents}
//                   />
//                 </div>
//               )}

//               {/* ===== LOCATION ===== */}
//               {project.location && (
//                 <p className="project-location">
//                   📍 {project.location}
//                 </p>
//               )}

//               {/* ===== CATEGORY ===== */}
//               {project.category && (
//                 <p className="project-category">
//                   {project.category}
//                 </p>
//               )}

//               {/* ===== COMPLETION DATE ===== */}
//               {project.completionDate && (
//                 <p className="project-date">
//                   Completed: {project.completionDate}
//                 </p>
//               )}

//               {/* ===== CLIENT ===== */}
//               {project.client && (
//                 <p className="project-client">
//                   Client: {project.client}
//                 </p>
//               )}

//               {/* ===== BUTTON ===== */}
//               {project.showButton && (
//                 <div
//                   className={`project-button ${project.buttonPosition || "center"
//                     }`}
//                 >
//                   <a
//                     href={project.buttonLink || "#"}
//                     className={`project-btn ${project.buttonStyle || "primary"
//                       }`}
//                     style={{
//                       background:
//                         project.buttonStyle === "primary"
//                           ? project.buttonColor || "#D4A64A"
//                           : "transparent",

//                       border:
//                         `2px solid ${project.buttonColor || "#D4A64A"}`,

//                       color:
//                         project.buttonStyle === "outline"
//                           ? project.buttonColor || "#D4A64A"
//                           : "#ffffff",
//                     }}
//                   >
//                     {project.buttonText}
//                   </a>
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// };

// export default Portfolio;




import "../styles/Portfolio.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

/* ================= QUERY ================= */

const portfolioQuery = `*[_type=="portfolio"][0]{

  heading,
  description,

  headingAlign,
  textAlign,

  gridLayout,

  backgroundColor,
  "backgroundImageUrl": backgroundImage.asset->url,
  useBackgroundImage,
  showOverlay,
  overlayColor,

  sectionHeight,
  sectionPadding,
  maxWidth,

  backgroundPosition,
  backgroundSize,

  cardWidth,
  cardHeight,
  cardGap,
  cardBackground,
  cardBorderRadius,
  cardBorder,
  cardShadow,
  cardPadding,
  cardHover,

  projects[]{
    _key,

    title,
    description,

    image,
    showImage,

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

    location,
    category,
    completionDate,
    client,

    showButton,
    buttonText,
    buttonLink,
    buttonStyle,
    buttonColor,
    buttonPosition,

    showProject
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
    textColor: ({ children, value }) => (
      <span style={{ color: value.color }}>
        {children}
      </span>
    ),

    fontSize: ({ children, value }) => (
      <span style={{ fontSize: value.size }}>
        {children}
      </span>
    ),

    fontFamily: ({ children, value }) => (
      <span style={{ fontFamily: value.family }}>
        {children}
      </span>
    ),
  },
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    client.fetch(portfolioQuery).then(setPortfolio);
  }, []);

  if (!portfolio || !portfolio.showSection) return null;

  return (
    <section
      id="projects"
      className="portfolio"
      style={{
        minHeight: portfolio.sectionHeight || "100vh",
        padding: portfolio.sectionPadding || "100px 8%",

        backgroundColor:
          portfolio.backgroundColor || "#f8f8f8",

        backgroundImage:
          portfolio.useBackgroundImage &&
          portfolio.backgroundImageUrl
            ? `url(${portfolio.backgroundImageUrl})`
            : "none",

        backgroundSize:
          portfolio.backgroundSize || "cover",

        backgroundPosition:
          portfolio.backgroundPosition || "center",

        backgroundRepeat: "no-repeat",

        position: "relative",
      }}
    >
      {portfolio.showOverlay && (
        <div
          className="portfolio-overlay"
          style={{
            background:
              portfolio.overlayColor ||
              "rgba(0,0,0,.35)",
          }}
        />
      )}

      <div
        className="portfolio-container"
        style={{
          maxWidth:
            portfolio.maxWidth || "1300px",

          margin: "0 auto",
        }}
      >
        {/* ================= DESCRIPTION ================= */}

        {portfolio.description && (
          <div
            className="portfolio-description"
            style={{
              textAlign:
                portfolio.textAlign || "center",
            }}
          >
            <PortableText
              value={portfolio.description}
              components={portableComponents}
            />
          </div>
        )}

        {/* ================= HEADING ================= */}

        {portfolio.heading && (
          <div
            className={`portfolio-title ${
              portfolio.headingAlign || "center"
            }`}
          >
            <PortableText
              value={portfolio.heading}
              components={portableComponents}
            />
          </div>
        )}

        {/* ================= GRID ================= */}

        <div
          className={`portfolio-grid ${
            portfolio.gridLayout || "three"
          }`}
          style={{
            gap: portfolio.cardGap || "30px",
          }}
        >
                    {portfolio.projects
            ?.filter((project) => project.showProject)
            .map((project) => (
              <div
                key={project._key}
                className={`portfolio-card ${portfolio.cardHover || ""}`}
                style={{
                  width: portfolio.cardWidth || "360px",
                  minHeight: portfolio.cardHeight || "420px",
                  background: portfolio.cardBackground || "#ffffff",
                  borderRadius: portfolio.cardBorderRadius || "20px",
                  border: portfolio.cardBorder || "none",
                  padding: portfolio.cardPadding || "24px",
                  boxShadow: portfolio.cardShadow
                    ? "0 15px 40px rgba(0,0,0,.18)"
                    : "none",
                }}
              >
                {/* ===== BADGE ===== */}
                {project.showBadge && (
                  <span
                    className="project-badge"
                    style={{
                      background:
                        project.badgeColor || "#D4A64A",
                    }}
                  >
                    {project.badgeText}
                  </span>
                )}

                {/* ===== IMAGE ===== */}
                {project.showImage && project.image?.asset && (
                  <div
                    className={`portfolio-image-wrapper ${
                      project.imageShape || "rectangle"
                    }`}
                  >
                    <img
                      src={urlFor(project.image).url()}
                      alt={
                        project.title?.[0]?.children?.[0]?.text ||
                        "Project"
                      }
                      style={{
                        width: project.imageWidth || "100%",
                        height: project.imageHeight || "240px",
                        objectFit:
                          project.imageObjectFit || "cover",
                        borderRadius:
                          project.imageBorderRadius || "16px",
                        border:
                          project.imageBorder || "none",
                        boxShadow: project.imageShadow
                          ? "0 10px 25px rgba(0,0,0,.2)"
                          : "none",
                      }}
                    />
                  </div>
                )}

                {/* ===== TITLE ===== */}
                {project.title && (
                  <div className="project-title">
                    <PortableText
                      value={project.title}
                      components={portableComponents}
                    />
                  </div>
                )}

                {/* ===== DESCRIPTION ===== */}
                {project.description && (
                  <div className="project-description">
                    <PortableText
                      value={project.description}
                      components={portableComponents}
                    />
                  </div>
                )}

                {/* ===== PROJECT INFO ===== */}

                {(project.location ||
                  project.category ||
                  project.completionDate ||
                  project.client) && (
                  <div className="project-meta">

                    {project.location && (
                      <p className="project-location">
                        📍 {project.location}
                      </p>
                    )}

                    {project.category && (
                      <p className="project-category">
                        <strong>Category:</strong>{" "}
                        {project.category}
                      </p>
                    )}

                    {project.completionDate && (
                      <p className="project-date">
                        <strong>Completed:</strong>{" "}
                        {project.completionDate}
                      </p>
                    )}

                    {project.client && (
                      <p className="project-client">
                        <strong>Client:</strong>{" "}
                        {project.client}
                      </p>
                    )}

                  </div>
                )}

                {/* ===== BUTTON ===== */}

                {project.showButton && (
                  <div
                    className={`project-button ${
                      project.buttonPosition || "center"
                    }`}
                  >
                    <a
                      href={project.buttonLink || "#"}
                      className={`project-btn ${
                        project.buttonStyle || "primary"
                      }`}
                      style={{
                        background:
                          project.buttonStyle === "primary"
                            ? project.buttonColor ||
                              "#D4A64A"
                            : "transparent",

                        border: `2px solid ${
                          project.buttonColor || "#D4A64A"
                        }`,

                        color:
                          project.buttonStyle ===
                          "outline"
                            ? project.buttonColor ||
                              "#D4A64A"
                            : "#ffffff",
                      }}
                    >
                      {project.buttonText || "View Project"}
                    </a>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;