// import "../styles/Services.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import { PortableText } from "@portabletext/react";

// /* ================= QUERY ================= */
// const servicesQuery = `*[_type=="services"][0]{
//   heading,
//   headingAlign,
//   description,
//   textAlign,
//   layout,
//   cardAlign,
//   backgroundColor,
//   showSection,
//   servicesList[]{
//     serviceTitle,
//     serviceDescription
//   }
// }`;

// /* ================= PORTABLE TEXT ================= */
// const portableComponents = {
//   block: {
//     normal: ({ children }) => <p>{children}</p>,
//     h1: ({ children }) => <h1>{children}</h1>,
//     h2: ({ children }) => <h2>{children}</h2>,
//     h3: ({ children }) => <h3>{children}</h3>,
//     blockquote: ({ children }) => (
//       <blockquote className="services-quote">{children}</blockquote>
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
//       <code className="services-code">{children}</code>
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

// const Services = () => {
//   const [services, setServices] = useState(null);

//   useEffect(() => {
//     client.fetch(servicesQuery).then(setServices);
//   }, []);

//   if (!services?.showSection) return null;

//   return (
//     <section
//       className="services"
//       id="services"
//       style={{
//         backgroundColor: services.backgroundColor || "#0f172a",
//       }}
//     >
//       {/* ===== HEADING ===== */}
//       {services.heading && (
//         <div
//           className="services-title"
//           style={{
//             textAlign: services.headingAlign || "center",
//           }}
//         >
//           <PortableText
//             value={services.heading}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ===== DESCRIPTION ===== */}
//       {services.description && (
//         <div
//           className="services-description"
//           style={{
//             textAlign: services.textAlign || "center",
//           }}
//         >
//           <PortableText
//             value={services.description}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ===== SERVICES LAYOUT ===== */}
//       <div
//         className={`services-grid ${services.layout || "grid"}`}
//         style={{
//           justifyContent: services.cardAlign || "center",
//         }}
//       >
//         {services.servicesList?.map((item, index) => (
//           <div className="service-card" key={index}>
//             <span className="service-id">
//               {String(index + 1).padStart(2, "0")}
//             </span>

//             {item.serviceTitle && (
//               <div className="service-title">
//                 <PortableText
//                   value={item.serviceTitle}
//                   components={portableComponents}
//                 />
//               </div>
//             )}

//             {item.serviceDescription && (
//               <div className="service-text">
//                 <PortableText
//                   value={item.serviceDescription}
//                   components={portableComponents}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Services;


// import "../styles/Services.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import imageUrlBuilder from "@sanity/image-url";
// import { PortableText } from "@portabletext/react";

// const builder = imageUrlBuilder(client);
// const urlFor = (source) => builder.image(source);

// /* ================= QUERY ================= */
// const servicesQuery = `*[_type=="services"][0]{
//   heading,
//   headingAlign,
//   description,
//   textAlign,
//   layout,
//   cardAlign,
//   backgroundColor,
//   showSection,
//   servicesList[]{
//     serviceTitle,
//     serviceDescription,
//     showImage,
//     imagePosition,
//     imageShape,
//     serviceImage{
//       asset->
//     }
//   }
// }`;

// /* ================= PORTABLE TEXT ================= */
// const portableComponents = {
//   block: {
//     normal: ({ children }) => <p>{children}</p>,
//     h1: ({ children }) => <h1>{children}</h1>,
//     h2: ({ children }) => <h2>{children}</h2>,
//     h3: ({ children }) => <h3>{children}</h3>,
//     blockquote: ({ children }) => (
//       <blockquote className="services-quote">{children}</blockquote>
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
//       <code className="services-code">{children}</code>
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

// const Services = () => {
//   const [services, setServices] = useState(null);

//   useEffect(() => {
//     client.fetch(servicesQuery).then(setServices);
//   }, []);

//   if (!services?.showSection) return null;

//   return (
//     <section
//       className="services"
//       id="services"
//       style={{
//         backgroundColor: services.backgroundColor || "#0f172a",
//       }}
//     >
//       {/* ===== HEADING ===== */}
//       {services.heading && (
//         <div
//           className="services-title"
//           style={{
//             textAlign: services.headingAlign || "center",
//           }}
//         >
//           <PortableText
//             value={services.heading}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ===== DESCRIPTION ===== */}
//       {services.description && (
//         <div
//           className="services-description"
//           style={{
//             textAlign: services.textAlign || "center",
//           }}
//         >
//           <PortableText
//             value={services.description}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       {/* ===== SERVICES GRID ===== */}
//       <div
//         className={`services-grid ${services.layout || "grid"}`}
//         style={{
//           justifyContent: services.cardAlign || "center",
//         }}
//       >
//         {services.servicesList?.map((item, index) => {
//           const position = item.imagePosition || "top";

//           return (
//             <div
//               className={`service-card ${position}`}
//               key={index}
//             >
//               {/* ===== IMAGE ===== */}
//               {item.showImage && item.serviceImage?.asset && (
//                 <div
//                   className={`service-image ${item.imageShape || "rectangle"}`}
//                 >
//                   <img
//                     src={urlFor(item.serviceImage).width(400).url()}
//                     alt="Service"
//                   />
//                 </div>
//               )}

//               {/* ===== TEXT AREA ===== */}
//               <div className="service-content">
//                 <span className="service-id">
//                   {String(index + 1).padStart(2, "0")}
//                 </span>

//                 {item.serviceTitle && (
//                   <div className="service-title">
//                     <PortableText
//                       value={item.serviceTitle}
//                       components={portableComponents}
//                     />
//                   </div>
//                 )}

//                 {item.serviceDescription && (
//                   <div className="service-text">
//                     <PortableText
//                       value={item.serviceDescription}
//                       components={portableComponents}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Services;


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
  headingAlign,
  description,
  textAlign,
  layout,
  cardAlign,
  backgroundColor,
  showSection,
  servicesList[]{
    serviceTitle,
    serviceDescription,
    showImage,
    imagePosition,
    imageShape,
    serviceImage{
      asset->
    }
  }
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
      console.log("SERVICES DATA:", data); // Debug
      setServices(data);
    });
  }, []);

  if (!services?.showSection) return null;

  return (
    <section
      className="services"
      id="services"
      style={{
        backgroundColor: services.backgroundColor || "#0f172a",
      }}
    >
      {/* ===== HEADING ===== */}
      {services.heading && (
        <div
          className="services-title"
          style={{
            textAlign: services.headingAlign || "center",
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
            textAlign: services.textAlign || "center",
          }}
        >
          <PortableText
            value={services.description}
            components={portableComponents}
          />
        </div>
      )}

      {/* ===== SERVICES GRID ===== */}
      <div
        className={`services-grid ${services.layout || "grid"}`}
        style={{
          justifyContent: services.cardAlign || "center",
        }}
      >
        {services.servicesList?.map((item, index) => {
          const position = item.imagePosition || "top";

          return (
            <div
              className={`service-card ${position}`}
              key={index}
            >
              {/* ===== IMAGE ===== */}
              {item.showImage && item.serviceImage?.asset && (
                <div
                  className={`service-image-wrapper ${
                    item.imageShape || "rectangle"
                  }`}
                >
                  <img
                    src={urlFor(item.serviceImage).width(500).url()}
                    alt="Service"
                    className="service-img"
                  />
                </div>
              )}

              {/* ===== TEXT AREA ===== */}
              <div className="service-content">
                <span className="service-id">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {item.serviceTitle && (
                  <div className="service-title">
                    <PortableText
                      value={item.serviceTitle}
                      components={portableComponents}
                    />
                  </div>
                )}

                {item.serviceDescription && (
                  <div className="service-text">
                    <PortableText
                      value={item.serviceDescription}
                      components={portableComponents}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;