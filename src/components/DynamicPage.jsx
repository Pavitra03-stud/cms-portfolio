// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { PortableText } from "@portabletext/react";

// import client from "../sanityClient";

// import Layout from "./Layout";
// import Hero from "./Hero";
// import About from "./About";
// import Services from "./Services";
// import Portfolio from "./Portfolio";
// import Contact from "./Contact";
// import Footer from "./Footer";

// import "../styles/DynamicPage.css";
// const renderRichText = (field) => {
//   if (!field) return null;

//   return field.map((item) => (
//     <PortableText
//       key={item._key}
//       value={item.content}
//       components={{
//         block: {
//           normal: ({ children }) => (
//             <p
//               style={{
//                 margin: 0,
//                 color: item.textColor || "#2E241B",
//                 fontFamily: item.fontFamily || "Poppins",
//                 fontSize: item.fontSize || "16px",
//                 fontWeight: item.fontWeight || "400",
//                 lineHeight: item.lineHeight || "1.6",
//                 textAlign: item.textAlign || "left",
//               }}
//             >
//               {children}
//             </p>
//           ),

//           h1: ({ children }) => (
//             <h1 style={{ color: item.textColor || "#2E241B", margin: 0 }}>
//               {children}
//             </h1>
//           ),

//           h2: ({ children }) => (
//             <h2 style={{ color: item.textColor || "#2E241B", margin: 0 }}>
//               {children}
//             </h2>
//           ),

//           h3: ({ children }) => (
//             <h3 style={{ color: item.textColor || "#2E241B", margin: 0 }}>
//               {children}
//             </h3>
//           ),
//         },
//       }}
//     />
//   ));
// };

// const DynamicPage = () => {
//   console.log(" DYNAMIC PAGE COMPONENT LOADED");
//   const location = useLocation();

//   const path = location.pathname;

//   const slug =
//     path === "/" ? "home" : path.replace(/^\/+/, "").split("/")[0];

//   const [page, setPage] = useState(null);

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type=="page" && slug.current==$slug][0]{

//           title,

//           useCustomNavbar,

//           customNavbar->{
//             menuItems[]{
//               label,
//               link,
//               subMenu[]{
//                 label,
//                 link
//               }
//             }
//           },

//           sections[]->{
//             _id,
//             _type,
//             ...,

//             backgroundImage{
//               asset->{
//                 _id,
//                 url
//               }
//             },

//             content[]{
//               ...,

//               image{
//                 asset->{
//                   _id,
//                   url
//                 }
//               },

//               authorImage{
//                 asset->{
//                   _id,
//                   url
//                 }
//               },

//               cards[]{
//                 ...,

//                 image{
//                   asset->{
//                     _id,
//                     url
//                   }
//                 }
//               }
//             }
//           }

//         }`,
//         { slug }
//       )
//       //.then((data) => setPage(data || null));
//       .then((data) => {
//         console.log("PAGE DATA:", data);
//         setPage(data || null);
//       });
//   }, [slug]);

//   if (!page) return <div>Loading...</div>;

//   const customMenu =
//     page.useCustomNavbar && page.customNavbar
//       ? page.customNavbar.menuItems
//       : null;
//   console.log("PAGE", page);
//   return (
//     <Layout customMenu={customMenu}>
//       <div>
//         {page.sections?.map((section, i) => {

//           // Hide section if disabled
//           if (section.showSection === false) return null;

//           switch (section._type) {

//             case "hero":
//               return <Hero key={i} />;

//             case "about":
//               return <About key={i} />;

//             case "services":
//               return <Services key={i} />;

//             case "portfolio":
//               return <Portfolio key={i} />;

//             case "contact":
//               return <Contact key={i} />;
//             case "footer":
//               return <Footer key={i} />;

//             case "customSection":
//               return (
//                 <section
//                   key={i}
//                   id={section.anchorId || ""}
//                   className={section.customClass || ""}
//                   style={{
//                     background:
//                       section.backgroundType === "color"
//                         ? section.backgroundColor
//                         : section.backgroundType === "gradient"
//                           ? section.backgroundGradient
//                           : undefined,

//                     backgroundImage:
//                       section.backgroundType === "image"
//                         ? `url(${section.backgroundImage?.asset?.url})`
//                         : undefined,

//                     backgroundSize:
//                       section.backgroundSize || "cover",

//                     backgroundPosition:
//                       section.backgroundPosition || "center",

//                     backgroundRepeat: "no-repeat",

//                     paddingTop: section.paddingTop,
//                     paddingBottom: section.paddingBottom,
//                     paddingLeft: section.paddingLeft,
//                     paddingRight: section.paddingRight,

//                     textAlign: section.textAlign,
//                   }}
//                 >
//                   {section.content?.map((block, index) => {

//                     switch (block._type) {

//                       case "richTextBlock":
//                         return (
//                           <div
//                             key={index}
//                             style={{
//                               fontFamily: block.fontFamily,
//                               fontSize: block.fontSize,
//                               fontWeight: block.fontWeight,
//                               color: block.textColor,
//                               textAlign: block.textAlign,
//                               lineHeight: block.lineHeight,
//                             }}
//                           >
//                             <PortableText value={block.content} />
//                           </div>
//                         );

//                       case "imageBlock":
//                         return (
//                           <img
//                             key={index}
//                             src={block.image?.asset?.url}
//                             alt={block.alt || ""}
//                             style={{
//                               width: block.width || "100%",
//                               height: block.height || "auto",
//                               objectFit: block.objectFit || "cover",
//                               borderRadius:
//                                 block.imageShape === "circle"
//                                   ? "50%"
//                                   : block.borderRadius || "12px",
//                             }}
//                           />
//                         );

//                       case "buttonBlock":
//                         return (
//                           <a
//                             key={index}
//                             href={block.link}
//                             target={block.openInNewTab ? "_blank" : "_self"}
//                             rel="noreferrer"
//                           >
//                             <button
//                               style={{
//                                 background: block.backgroundColor,
//                                 color: block.textColor,
//                                 borderRadius: block.borderRadius,
//                                 padding: "12px 24px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               {block.text}
//                             </button>
//                           </a>
//                         );

//                       case "dividerBlock":
//                         return <hr key={index} />;

//                       case "quoteBlock":
//                         return (
//                           <blockquote key={index}>
//                             <p>{block.quote}</p>
//                             <strong>{block.author}</strong>
//                           </blockquote>
//                         );

//                       case "ratingBlock":
//                         return (
//                           <div key={index}>
//                             ⭐ {block.rating}/{block.maxRating}
//                           </div>
//                         );

//                       case "counterBlock":
//                         return (
//                           <h2 key={index}>
//                             {block.prefix}
//                             {block.number}
//                             {block.suffix}
//                           </h2>
//                         );

//                       case "progressBlock":
//                         return (
//                           <div key={index}>
//                             <p>{block.label}</p>
//                             <progress
//                               value={block.value}
//                               max="100"
//                             />
//                           </div>
//                         );

//                       case "videoBlock":
//                         return (
//                           <video
//                             key={index}
//                             controls={block.controls}
//                             autoPlay={block.autoplay}
//                             muted={block.muted}
//                             loop={block.loop}
//                             width="100%"
//                           >
//                             <source src={block.url} />
//                           </video>
//                         );

//                       case "cardCollection":
//                         return (
//                           <div
//                             key={index}
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               alignItems: "center",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "100%",
//                                 textAlign: "center",
//                                 marginBottom: "30px",
//                               }}
//                             >
//                               {renderRichText(block.title)}
//                             </div>

//                             <div
//                               style={{
//                                 width: "100%",
//                                 display: "grid",
//                                 alignItems: "start",
//                                 gridTemplateColumns:
//                                   "repeat(auto-fit, minmax(380px, 500px))",
//                                 gap: block.gap || "24px",
//                                 justifyContent: "center",
//                                 justifyItems: "center",
//                               }}
//                             >
//                               {block.cards?.map((card, c) => (
//                                 <div
//                                   key={c}
//                                   className="custom-card"
//                                   style={{
//                                     width: "360px",
//                                     background: "#fff",
//                                     borderRadius: "18px",
//                                     padding: "20px",
//                                     boxShadow: "0 12px 30px rgba(0,0,0,.08)",
//                                     display: "flex",
//                                     flexDirection: "column",
//                                   }}
//                                 >
//                                   {card.image?.asset?.url && (
//                                     <img
//                                       src={card.image.asset.url}
//                                       alt=""
//                                       style={{
//                                         width: "100%",
//                                         height: "180px",
//                                         objectFit: "cover",
//                                         borderRadius: "14px",
//                                         display: "block",
//                                       }}
//                                     />
//                                   )}

//                                   {card.badge && (
//                                     <div
//                                       style={{
//                                         display: "inline-block",
//                                         background: card.badgeColor,//|| "#2563eb",
//                                         color: "#fff",
//                                         padding: "5px 12px",
//                                         borderRadius: "20px",
//                                         marginBottom: "10px",
//                                       }}
//                                     >
//                                       {renderRichText(card.badge)}
//                                     </div>
//                                   )}

//                                   {card.icon && (
//                                     <div
//                                       style={{
//                                         fontSize: "32px",
//                                         marginBottom: "10px",
//                                       }}
//                                     >
//                                       {card.icon}
//                                     </div>
//                                   )}
//                                   {card.showNumber && (
//                                     <h1
//                                       style={{
//                                         fontSize: "20px",
//                                         fontWeight: "700",
//                                         color: "#2E241B",
//                                         margin: "0 0 15px 0",
//                                         lineHeight: "1",
//                                       }}
//                                     >
//                                       {card.number}
//                                     </h1>
//                                   )}
//                                   {renderRichText(card.title)}

//                                   {renderRichText(card.subtitle)}

//                                   {renderRichText(card.description)}

//                                   {card.showRating && (
//                                     <p
//                                       style={{
//                                         color: "#2E241B",
//                                         fontWeight: "600",
//                                         marginBottom: "10px",
//                                       }}
//                                     >
//                                       ⭐ <span style={{ color: "#D4A017" }}>{card.rating}</span>/5
//                                     </p>
//                                   )}

//                                   {card.price && (
//                                     <p
//                                       style={{
//                                         color: "#2E241B",
//                                         fontWeight: "600",
//                                         marginBottom: "10px",
//                                       }}
//                                     >
//                                       <span style={{ color: "#2E241B" }}>{card.price}</span>

//                                       {card.oldPrice && (
//                                         <span
//                                           style={{
//                                             marginLeft: "10px",
//                                             color: "#777",
//                                             textDecoration: "line-through",
//                                           }}
//                                         >
//                                           {card.oldPrice}
//                                         </span>
//                                       )}
//                                     </p>
//                                   )}

//                                   {card.category && (
//                                     <div style={{ color: "#222", marginBottom: "8px" }}>
//                                       <strong style={{ color: "#222" }}>Category:</strong>{" "}
//                                       {renderRichText(card.category)}
//                                     </div>
//                                   )}

//                                   {card.location && (
//                                     <div style={{ color: "#222", marginBottom: "8px" }}>
//                                       <strong style={{ color: "#222" }}>Location:</strong>{" "}
//                                       {renderRichText(card.location)}
//                                     </div>
//                                   )}

//                                   {card.client && (
//                                     <div style={{ color: "#222", marginBottom: "8px" }}>
//                                       <strong style={{ color: "#222" }}>Client:</strong>{" "}
//                                       {renderRichText(card.client)}
//                                     </div>
//                                   )}

//                                   {card.date && (
//                                     <p style={{ color: "#222", marginBottom: "8px" }}>
//                                       <strong style={{ color: "#222" }}>Date:</strong> {card.date}
//                                     </p>
//                                   )}


//                                   {card.tags?.length > 0 && (
//                                     <div
//                                       style={{
//                                         display: "flex",
//                                         gap: "8px",
//                                         flexWrap: "wrap",
//                                         marginTop: "10px",
//                                       }}
//                                     >
//                                       {card.tags.map((tag, t) => (
//                                         <span
//                                           key={t}
//                                           style={{
//                                             background: "#F5E8C7",      // Light gold/cream
//                                             color: "#2E241B",           // Dark brown text
//                                             padding: "6px 12px",
//                                             borderRadius: "20px",
//                                             fontWeight: "500",
//                                             border: "1px solid #D6B96B",
//                                           }}
//                                         >
//                                           {tag}
//                                         </span>
//                                       ))}
//                                     </div>
//                                   )}

//                                   {card.buttonText && (
//                                     <a
//                                       href={card.buttonLink}
//                                       style={{
//                                         display: "inline-block",
//                                         marginTop: "20px",
//                                         padding: "10px 18px",
//                                         background: "#2563eb",
//                                         color: "#fff",
//                                         borderRadius: "8px",
//                                         textDecoration: "none",
//                                       }}
//                                     >
//                                       {renderRichText(card.buttonText)}
//                                     </a>
//                                   )}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         );

//                       default:
//                         return null;
//                     }
//                   })}
//                 </section>
//               );

//             default:
//               return null;
//           }
//         })}
//       </div>
//     </Layout>
//   );
// };

// export default DynamicPage;
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PortableText } from "@portabletext/react";

import client from "../sanityClient";

import Layout from "./Layout";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import Footer from "./Footer";

import "../styles/DynamicPage.css";

const renderRichText = (field) => {
  if (!field) return null;

  return field.map((item) => (
    <PortableText
      key={item._key}
      value={item.content}
      components={{
        block: {
          normal: ({ children }) => (
            <p
              style={{
                margin: 0,
                color: item.textColor || "#2E241B",
                fontFamily: item.fontFamily || "Poppins",
                fontSize: item.fontSize || "16px",
                fontWeight: item.fontWeight || "400",
                lineHeight: item.lineHeight || "1.6",
                textAlign: item.textAlign || "left",
              }}
            >
              {children}
            </p>
          ),

          h1: ({ children }) => (
            <h1 style={{ color: item.textColor || "#2E241B", margin: 0 }}>
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 style={{ color: item.textColor || "#2E241B", margin: 0 }}>
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 style={{ color: item.textColor || "#2E241B", margin: 0 }}>
              {children}
            </h3>
          ),
        },
      }}
    />
  ));
};

/* =====================================================================
   CARD RENDERER
   Shared between the grid layout and the carousel layout so both stay
   visually identical — only the outer container/wrapper differs.
===================================================================== */

const renderCardBody = (card, cardStyleClass) => {
  const styleVariants = {
    default: { background: "#fff", boxShadow: "0 12px 30px rgba(0,0,0,.08)", border: "none" },
    glass: {
      background: "rgba(255,255,255,0.55)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 24px rgba(0,0,0,.06)",
      border: "1px solid rgba(255,255,255,.4)",
    },
    outlined: { background: "#fff", boxShadow: "none", border: "1px solid #D6B96B" },
    minimal: { background: "transparent", boxShadow: "none", border: "none" },
    shadow: { background: "#fff", boxShadow: "0 20px 45px rgba(0,0,0,.14)", border: "none" },
  };

  const variant = styleVariants[cardStyleClass] || styleVariants.default;

  return (
    <div
      className="custom-card"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "18px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        ...variant,
      }}
    >
      {card.image?.asset?.url && (
        <img
          src={card.image.asset.url}
          alt=""
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius:
              card.imageShape === "circle"
                ? "50%"
                : card.imageShape === "square"
                  ? "0px"
                  : "14px",
            display: "block",
          }}
        />
      )}

      {card.badge && (
        <div
          style={{
            display: "inline-block",
            background: card.badgeColor,
            color: "#fff",
            padding: "5px 12px",
            borderRadius: "20px",
            marginBottom: "10px",
            marginTop: card.image?.asset?.url ? "10px" : 0,
            alignSelf: "flex-start",
          }}
        >
          {renderRichText(card.badge)}
        </div>
      )}

      {card.icon && (
        <div style={{ fontSize: "32px", marginBottom: "10px" }}>{card.icon}</div>
      )}

      {card.showNumber && (
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#2E241B",
            margin: "0 0 15px 0",
            lineHeight: "1",
          }}
        >
          {card.number}
        </h1>
      )}

      {renderRichText(card.title)}
      {renderRichText(card.subtitle)}
      {renderRichText(card.description)}

      {card.showRating && (
        <p style={{ color: "#2E241B", fontWeight: "600", marginBottom: "10px" }}>
          ⭐ <span style={{ color: "#D4A017" }}>{card.rating}</span>/5
        </p>
      )}

      {card.price && (
        <p style={{ color: "#2E241B", fontWeight: "600", marginBottom: "10px" }}>
          <span style={{ color: "#2E241B" }}>{card.price}</span>
          {card.oldPrice && (
            <span
              style={{ marginLeft: "10px", color: "#777", textDecoration: "line-through" }}
            >
              {card.oldPrice}
            </span>
          )}
        </p>
      )}

      {card.category && (
        <div style={{ color: "#222", marginBottom: "8px" }}>
          <strong style={{ color: "#222" }}>Category:</strong> {renderRichText(card.category)}
        </div>
      )}

      {card.location && (
        <div style={{ color: "#222", marginBottom: "8px" }}>
          <strong style={{ color: "#222" }}>Location:</strong> {renderRichText(card.location)}
        </div>
      )}

      {card.client && (
        <div style={{ color: "#222", marginBottom: "8px" }}>
          <strong style={{ color: "#222" }}>Client:</strong> {renderRichText(card.client)}
        </div>
      )}

      {card.date && (
        <p style={{ color: "#222", marginBottom: "8px" }}>
          <strong style={{ color: "#222" }}>Date:</strong> {card.date}
        </p>
      )}

      {card.tags?.length > 0 && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
          {card.tags.map((tag, t) => (
            <span
              key={t}
              style={{
                background: "#F5E8C7",
                color: "#2E241B",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "500",
                border: "1px solid #D6B96B",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {card.buttonText && (
        <a
          href={card.buttonLink}
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 18px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            alignSelf: "flex-start",
          }}
        >
          {renderRichText(card.buttonText)}
        </a>
      )}
    </div>
  );
};

/* =====================================================================
   CAROUSEL
   Handles the "carousel" (and "horizontal") layout option for
   cardCollection, driven entirely by the fields already defined on the
   schema: autoplay, loop, navigation, pagination, slidesPerView, gap.
===================================================================== */

const CardCarousel = ({ block }) => {
  const cards = block.cards || [];
  const slidesPerView = Math.max(1, block.slidesPerView || 3);
  // const gap = block.gap || "24px";
  const gap = parseInt(block.gap) || 24;
  const loop = block.loop !== false;
  const autoplay = block.autoplay !== false;
  const showNavigation = block.navigation !== false;
  const showPagination = block.pagination !== false;

  const [index, setIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(slidesPerView);
  const timerRef = useRef(null);

  const maxIndex = Math.max(0, cards.length - visibleSlides);

  // Responsive slide count so the carousel behaves on smaller screens
  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleSlides(1);
      else if (width < 960) setVisibleSlides(Math.min(2, slidesPerView));
      else setVisibleSlides(slidesPerView);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [slidesPerView]);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, Math.max(0, cards.length - visibleSlides)));
  }, [visibleSlides, cards.length]);

  const goTo = (next) => {
    if (next < 0) {
      setIndex(loop ? maxIndex : 0);
    } else if (next > maxIndex) {
      setIndex(loop ? 0 : maxIndex);
    } else {
      setIndex(next);
    }
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  useEffect(() => {
    if (!autoplay || cards.length <= visibleSlides) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next > maxIndex) return loop ? 0 : maxIndex;
        return next;
      });
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, [autoplay, loop, maxIndex, cards.length, visibleSlides]);

  if (cards.length === 0) return null;

  const slideWidthPercent = 100 / visibleSlides;

  return (
    // <div style={{ width: "100%", position: "relative" }}>
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative",
        padding: "0 50px",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        overflowX: "hidden",
        overflowY: "visible", width: "100%"
      }}>
        <div
          style={{
            display: "flex",
            //gap,
            gap: `${gap}px`,
            // transform: `translateX(calc(-${index * slideWidthPercent}% - ${index} * ${gap} / ${visibleSlides}))`,
            //transform: `translateX(calc(-${index * slideWidthPercent}% - ${index * gap}px))`,
            transform: `translateX(-${index * (380 + gap)}px)`,
          }}
        >
          {cards.map((card, c) => (
            <div
              key={c}
              style={{
                flex: "0 0 380px",
                width: "380px",
                boxSizing: "border-box",
              }}
            >
              {renderCardBody(card, block.cardStyle)}
            </div>
          ))}
        </div>
      </div>

      {showNavigation && cards.length > visibleSlides && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous"
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              background: "#2E241B",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(0,0,0,.2)",
            }}
          >
            ‹
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              background: "#2E241B",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(0,0,0,.2)",
            }}
          >
            ›
          </button>
        </>
      )}

      {showPagination && cards.length > visibleSlides && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, dot) => (
            <button
              key={dot}
              onClick={() => setIndex(dot)}
              aria-label={`Go to slide ${dot + 1}`}
              style={{
                width: dot === index ? "22px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background: dot === index ? "#2E241B" : "#D6B96B",
                cursor: "pointer",
                transition: "width 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* =====================================================================
   CARD GRID (existing default layout, unchanged behaviour)
===================================================================== */

const CardGrid = ({ block }) => (
  <div
    style={{
      width: "100%",
      display: "grid",
      alignItems: "start",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 500px))",
      gap: block.gap || "24px",
      justifyContent: "center",
      justifyItems: "center",
    }}
  >
    {block.cards?.map((card, c) => (
      <div key={c} style={{ width: "360px" }}>
        {renderCardBody(card, block.cardStyle)}
      </div>
    ))}
  </div>
);

const DynamicPage = () => {
  console.log(" DYNAMIC PAGE COMPONENT LOADED");
  const location = useLocation();

  const path = location.pathname;

  const slug =
    path === "/" ? "home" : path.replace(/^\/+/, "").split("/")[0];

  const [page, setPage] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="page" && slug.current==$slug][0]{

          title,

          useCustomNavbar,

          customNavbar->{
            menuItems[]{
              label,
              link,
              subMenu[]{
                label,
                link
              }
            }
          },

          sections[]->{
            _id,
            _type,
            ...,

            backgroundImage{
              asset->{
                _id,
                url
              }
            },

            content[]{
              ...,

              image{
                asset->{
                  _id,
                  url
                }
              },

              authorImage{
                asset->{
                  _id,
                  url
                }
              },

              cards[]{
                ...,

                image{
                  asset->{
                    _id,
                    url
                  }
                }
              }
            }
          }

        }`,
        { slug }
      )
      //.then((data) => setPage(data || null));
      .then((data) => {
        console.log("PAGE DATA:", data);
        setPage(data || null);
      });
  }, [slug]);

  if (!page) return <div>Loading...</div>;

  const customMenu =
    page.useCustomNavbar && page.customNavbar
      ? page.customNavbar.menuItems
      : null;
  console.log("PAGE", page);
  return (
    <Layout customMenu={customMenu}>
      <div>
        {page.sections?.map((section, i) => {

          // Hide section if disabled
          if (section.showSection === false) return null;

          switch (section._type) {

            case "hero":
              return <Hero key={i} />;

            case "about":
              return <About key={i} />;

            case "services":
              return <Services key={i} />;

            case "portfolio":
              return <Portfolio key={i} />;

            case "contact":
              return <Contact key={i} />;
            case "footer":
              return <Footer key={i} />;

            case "customSection":
              return (
                <section
                  key={i}
                  id={section.anchorId || ""}
                  className={section.customClass || ""}
                  style={{
                    background:
                      section.backgroundType === "color"
                        ? section.backgroundColor
                        : section.backgroundType === "gradient"
                          ? section.backgroundGradient
                          : undefined,

                    backgroundImage:
                      section.backgroundType === "image"
                        ? `url(${section.backgroundImage?.asset?.url})`
                        : undefined,

                    backgroundSize:
                      section.backgroundSize || "cover",

                    backgroundPosition:
                      section.backgroundPosition || "center",

                    backgroundRepeat: "no-repeat",

                    paddingTop: section.paddingTop,
                    paddingBottom: section.paddingBottom,
                    paddingLeft: section.paddingLeft,
                    paddingRight: section.paddingRight,

                    textAlign: section.textAlign,
                  }}
                >
                  {section.content?.map((block, index) => {

                    switch (block._type) {

                      case "richTextBlock":
                        return (
                          <div
                            key={index}
                            style={{
                              fontFamily: block.fontFamily,
                              fontSize: block.fontSize,
                              fontWeight: block.fontWeight,
                              color: block.textColor,
                              textAlign: block.textAlign,
                              lineHeight: block.lineHeight,
                            }}
                          >
                            <PortableText value={block.content} />
                          </div>
                        );

                      case "imageBlock":
                        return (
                          <img
                            key={index}
                            src={block.image?.asset?.url}
                            alt={block.alt || ""}
                            style={{
                              width: block.width || "100%",
                              height: block.height || "auto",
                              objectFit: block.objectFit || "cover",
                              borderRadius:
                                block.imageShape === "circle"
                                  ? "50%"
                                  : block.borderRadius || "12px",
                            }}
                          />
                        );

                      case "buttonBlock":
                        return (
                          <a
                            key={index}
                            href={block.link}
                            target={block.openInNewTab ? "_blank" : "_self"}
                            rel="noreferrer"
                          >
                            <button
                              style={{
                                background: block.backgroundColor,
                                color: block.textColor,
                                borderRadius: block.borderRadius,
                                padding: "12px 24px",
                                cursor: "pointer",
                              }}
                            >
                              {block.text}
                            </button>
                          </a>
                        );

                      case "dividerBlock":
                        return <hr key={index} />;

                      case "quoteBlock":
                        return (
                          <blockquote key={index}>
                            <p>{block.quote}</p>
                            <strong>{block.author}</strong>
                          </blockquote>
                        );

                      case "ratingBlock":
                        return (
                          <div key={index}>
                            ⭐ {block.rating}/{block.maxRating}
                          </div>
                        );

                      case "counterBlock":
                        return (
                          <h2 key={index}>
                            {block.prefix}
                            {block.number}
                            {block.suffix}
                          </h2>
                        );

                      case "progressBlock":
                        return (
                          <div key={index}>
                            <p>{block.label}</p>
                            <progress
                              value={block.value}
                              max="100"
                            />
                          </div>
                        );

                      case "videoBlock":
                        return (
                          <video
                            key={index}
                            controls={block.controls}
                            autoPlay={block.autoplay}
                            muted={block.muted}
                            loop={block.loop}
                            width="100%"
                          >
                            <source src={block.url} />
                          </video>
                        );

                      case "cardCollection":
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                textAlign: "center",
                                marginBottom: "30px",
                              }}
                            >
                              {renderRichText(block.title)}
                              {renderRichText(block.subtitle)}
                            </div>
                            
                            {block.layout === "carousel" ||

                              block.layout === "horizontal" ? (

                              <CardCarousel block={block} />
                            ) : (
                              <CardGrid block={block} />
                            )}
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </Layout>
  );
};

export default DynamicPage;
