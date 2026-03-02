// import "../styles/Contact.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import { PortableText } from "@portabletext/react";

// const contactQuery = `*[_type == "contact"][0]{
//   heading,
//   description,
//   email,
//   phone,
//   address,
//   showSection
// }`;

// /*  FULL RICH TEXT SUPPORT */
// const portableComponents = {
//   block: {
//     normal: ({ children }) => <p>{children}</p>,
//     h1: ({ children }) => <h1>{children}</h1>,
//     h2: ({ children }) => <h2>{children}</h2>,
//     h3: ({ children }) => <h3>{children}</h3>,
//     blockquote: ({ children }) => (
//       <blockquote className="contact-quote">{children}</blockquote>
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
//       <code className="contact-code">{children}</code>
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

// const Contact = () => {
//   const [contact, setContact] = useState(null);

//   useEffect(() => {
//     client.fetch(contactQuery).then(setContact);
//   }, []);

//   if (!contact?.showSection) return null;

//   return (
//     <section className="contact" id="contact">

//       {/* ===== HEADING ===== */}
//       {contact.heading && (
//         <div className="contact-title">
//           <PortableText
//             value={contact.heading}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       <div className="contact-wrapper">

//         {/* ===== LEFT SIDE ===== */}
//         <div className="contact-left">

//           {contact.description && (
//             <PortableText
//               value={contact.description}
//               components={portableComponents}
//             />
//           )}

//           {contact.email && (
//             <div className="contact-detail">
//               <strong>Email: </strong>
//               <PortableText
//                 value={contact.email}
//                 components={portableComponents}
//               />
//             </div>
//           )}

//           {contact.phone && (
//             <div className="contact-detail">
//               <strong>Phone: </strong>
//               <PortableText
//                 value={contact.phone}
//                 components={portableComponents}
//               />
//             </div>
//           )}

//           {contact.address && (
//             <div className="contact-detail">
//               <strong>Address: </strong>
//               <PortableText
//                 value={contact.address}
//                 components={portableComponents}
//               />
//             </div>
//           )}

//         </div>

//         {/* ===== RIGHT FORM ===== */}
//         <form className="contact-form">
//           <input type="text" placeholder="Your Name" />
//           <input type="email" placeholder="Your Email" />
//           <textarea rows="5" placeholder="Your Message"></textarea>

//           <button type="submit" className="primary-btn">
//             Send Message
//           </button>
//         </form>

//       </div>
//     </section>
//   );
// };

// export default Contact;


// import "../styles/Contact.css";
// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import { PortableText } from "@portabletext/react";

// /* ================= QUERY ================= */
// const contactQuery = `*[_type == "contact"][0]{
//   heading,
//   description,
//   email,
//   phone,
//   address,
//   layout,
//   textAlign,
//   backgroundColor,
//   paddingTop,
//   paddingBottom,
//   contactOrder,
//   formPosition,
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
//       <blockquote className="contact-quote">{children}</blockquote>
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
//       <code className="contact-code">{children}</code>
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

// const Contact = () => {
//   const [contact, setContact] = useState(null);

//   useEffect(() => {
//     client.fetch(contactQuery).then(setContact);
//   }, []);

//   if (!contact?.showSection) return null;

//   /* ================= FIELD RENDERER ================= */
//   const renderField = (type) => {
//     if (!contact[type]) return null;

//     const labelMap = {
//       email: "Email",
//       phone: "Phone",
//       address: "Address",
//     };

//     return (
//       <div className="contact-detail" key={type}>
//         <strong>{labelMap[type]}: </strong>
//         <PortableText
//           value={contact[type]}
//           components={portableComponents}
//         />
//       </div>
//     );
//   };

//   /* ================= ORDER CONTROL ================= */
//   const orderedFields =
//     contact.contactOrder?.length
//       ? contact.contactOrder.map((item) => renderField(item))
//       : ["email", "phone", "address"].map((item) =>
//           renderField(item)
//         );

//   /* ================= LAYOUT CONTROL ================= */
//   const layoutDirection =
//     contact.layout === "column"
//       ? "column"
//       : contact.layout === "column-reverse"
//       ? "column-reverse"
//       : contact.layout === "row-reverse"
//       ? "row-reverse"
//       : "row";

//   return (
//     <section
//       className="contact"
//       id="contact"
//       style={{
//         backgroundColor: contact.backgroundColor || "transparent",
//         paddingTop: contact.paddingTop || "100px",
//         paddingBottom: contact.paddingBottom || "100px",
//         textAlign: contact.textAlign || "left",
//       }}
//     >
//       {/* ===== HEADING ===== */}
//       {contact.heading && (
//         <div className="contact-title">
//           <PortableText
//             value={contact.heading}
//             components={portableComponents}
//           />
//         </div>
//       )}

//       <div
//         className="contact-wrapper"
//         style={{
//           display: "flex",
//           flexDirection: layoutDirection,
//           gap: "60px",
//           alignItems: "flex-start",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* ===== TEXT SIDE ===== */}
//         <div className="contact-left" style={{ flex: 1 }}>
//           {contact.description && (
//             <PortableText
//               value={contact.description}
//               components={portableComponents}
//             />
//           )}

//           {orderedFields}
//         </div>

//         {/* ===== FORM SIDE (POSITION CONTROLLED) ===== */}
//         <div
//           className={`contact-form-wrapper ${
//             contact.formPosition || "default"
//           }`}
//           style={{ flex: 1 }}
//         >
//           <form className="contact-form">
//             <input type="text" placeholder="Your Name" />
//             <input type="email" placeholder="Your Email" />
//             <textarea rows="5" placeholder="Your Message"></textarea>

//             <button type="submit" className="primary-btn">
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;


import "../styles/Contact.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

/* ================= IMAGE BUILDER ================= */
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

/* ================= QUERY ================= */
const contactQuery = `*[_type == "contact"][0]{
  heading,
  description,
  email,
  phone,
  address,
  layout,
  textAlign,
  backgroundColor,
  paddingTop,
  paddingBottom,
  contactOrder,
  formAlign,
  infoAlign,
  formWidth,
  showImage,
  contactImage,
  imagePosition,
  imageShape,
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
      <blockquote className="contact-quote">{children}</blockquote>
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
      <code className="contact-code">{children}</code>
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

const Contact = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    client.fetch(contactQuery).then(setContact);
  }, []);

  if (!contact?.showSection) return null;

  /* ================= FIELD RENDERER ================= */
  const renderField = (type) => {
    if (!contact[type]) return null;

    const labelMap = {
      email: "Email",
      phone: "Phone",
      address: "Address",
    };

    return (
      <div className="contact-detail" key={type}>
        <strong>{labelMap[type]}: </strong>
        <PortableText
          value={contact[type]}
          components={portableComponents}
        />
      </div>
    );
  };

  /* ================= ORDER CONTROL ================= */
  const orderedFields =
    contact.contactOrder?.length
      ? contact.contactOrder.map((item) => renderField(item))
      : ["email", "phone", "address"].map((item) =>
          renderField(item)
        );

  /* ================= LAYOUT CONTROL ================= */
  const layoutDirection =
    contact.layout === "column"
      ? "column"
      : contact.layout === "column-reverse"
      ? "column-reverse"
      : contact.layout === "row-reverse"
      ? "row-reverse"
      : "row";

  /* ================= IMAGE COMPONENT ================= */
  const imageComponent =
    contact.showImage && contact.contactImage ? (
      <div
        className={`contact-image-wrapper ${
          contact.imageShape || "rectangle"
        }`}
      >
        <img
          src={urlFor(contact.contactImage).width(400).url()}
          alt="Contact"
        />
      </div>
    ) : null;

  return (
    <section
      className="contact"
      id="contact"
      style={{
        backgroundColor: contact.backgroundColor || "transparent",
        paddingTop: contact.paddingTop || "100px",
        paddingBottom: contact.paddingBottom || "100px",
        textAlign: contact.textAlign || "left",
      }}
    >
      {/* ===== HEADING ===== */}
      {contact.heading && (
        <div className="contact-title">
          <PortableText
            value={contact.heading}
            components={portableComponents}
          />
        </div>
      )}

      <div
        className="contact-wrapper"
        style={{
          display: "flex",
          flexDirection: layoutDirection,
          gap: "60px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* IMAGE LEFT */}
        {contact.imagePosition === "left" && imageComponent}

        {/* ===== TEXT SIDE ===== */}
        <div
          className="contact-left"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: contact.infoAlign || "flex-start",
          }}
        >
          {contact.description && (
            <PortableText
              value={contact.description}
              components={portableComponents}
            />
          )}

          {orderedFields}
        </div>

        {/* IMAGE RIGHT */}
        {contact.imagePosition === "right" && imageComponent}

        {/* ===== FORM SIDE ===== */}
        <div
          className="contact-form-wrapper"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: contact.formAlign || "flex-start",
          }}
        >
          <form
            className="contact-form"
            style={{ width: contact.formWidth || "100%" }}
          >
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea rows="5" placeholder="Your Message"></textarea>

            <button type="submit" className="primary-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* IMAGE TOP */}
        {contact.imagePosition === "top" && (
          <div style={{ width: "100%" }}>{imageComponent}</div>
        )}

        {/* IMAGE BOTTOM */}
        {contact.imagePosition === "bottom" && (
          <div style={{ width: "100%" }}>{imageComponent}</div>
        )}
      </div>
    </section>
  );
};

export default Contact;