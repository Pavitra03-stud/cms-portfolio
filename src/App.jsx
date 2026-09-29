// import { useEffect, useState } from "react";
// import client from "./sanityClient";
// import imageUrlBuilder from "@sanity/image-url";

// import Layout from "./components/Layout";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Services from "./components/Services";
// import Portfolio from "./components/Portfolio";
// import Contact from "./components/Contact";
// import DynamicPage from "./components/DynamicPage";
// import Footer from "./components/Footer";
// import WebsitePreview from "./WebsitePreview";
// import { Swiper, SwiperSlide } from "swiper/react";
// //import Websites from "./Websites";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { PortableText } from "@portabletext/react";
// import "./index.css";

// /* 🔥 ROUTER */
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const builder = imageUrlBuilder(client);
// const urlFor = (source) => builder.image(source);

// /* ================= HOME PAGE ================= */

// const HomePage = ({ customSections, settings }) => {
//   return (
//     <Layout navigationId="cde8eed9-bd63-4c3d-a59e-7cd5281b0ded">
//       <div
//         style={{
//           backgroundColor: settings?.backgroundColor || "#0f172a",
//           minHeight: "100vh",
//         }}
//       >
//         {/* DEFAULT SECTIONS */}
//         <Hero />
//         <About />
//         <Services />
//         <Portfolio />

//         {/* CUSTOM SECTIONS */}
//         {customSections.map((section) => (
//           <section
//             key={section._id}
//             id={section.slug}
//             className={`custom-section ${section.layout || "center"}`}
//             style={{
//               backgroundColor: section.backgroundColor || "transparent",
//               textAlign: section.textAlign || "left",
//               paddingTop: section.paddingTop || "100px",
//               paddingBottom: section.paddingBottom || "100px",
//             }}
//           >
//             {section.title && (
//               <h2 className="custom-title">{section.title}</h2>
//             )}

//             <PortableText
//               value={section.content}
//               components={{
//                 types: {
//                   button: ({ value }) => (
//                     <div
//                       style={{
//                         textAlign: value?.align || "left",
//                         marginTop: "20px",
//                       }}
//                     >
//                       <a
//                         href={value?.link || "#"}
//                         className={`custom-btn ${value?.style || "primary"}`}
//                       >
//                         {value?.text || "Click"}
//                       </a>
//                     </div>
//                   ),

//                   image: ({ value }) => {
//                     if (!value?.asset) return null;

//                     return (
//                       <div
//                         className={`custom-image-wrapper ${value.imageAlign || "center"
//                           }`}
//                       >
//                         <img
//                           src={urlFor(value).width(1000).url()}
//                           alt=""
//                           className="custom-image"
//                         />
//                       </div>
//                     );
//                   },

//                   imageGallery: ({ value }) => {
//                     if (!value?.images?.length) return null;

//                     if (value.display === "grid") {
//                       return (
//                         <div
//                           className={`custom-gallery ${value?.columns || "three"
//                             } ${value?.galleryAlign || "center"}`}
//                         >
//                           {value.images.map((img, index) => {
//                             if (!img?.asset) return null;

//                             return (
//                               <div
//                                 key={index}
//                                 className={`gallery-item ${value?.shape || "rectangle"
//                                   }`}
//                               >
//                                 <img
//                                   src={urlFor(img).width(600).url()}
//                                   alt=""
//                                 />
//                               </div>
//                             );
//                           })}
//                         </div>
//                       );
//                     }

//                     if (value.display === "carousel") {
//                       return (
//                         <Swiper
//                           modules={[Navigation, Pagination, Autoplay]}
//                           spaceBetween={30}
//                           navigation
//                           pagination={{ clickable: true }}
//                           autoplay={{ delay: 2500 }}
//                           loop={true}
//                           breakpoints={{
//                             320: { slidesPerView: 1 },
//                             768: { slidesPerView: 2 },
//                             1024: { slidesPerView: 3 },
//                           }}
//                         >
//                           {value.images.map((img, index) => {
//                             if (!img?.asset) return null;

//                             return (
//                               <SwiperSlide key={index}>
//                                 <div
//                                   className={`gallery-item ${value?.shape || "rectangle"
//                                     }`}
//                                 >
//                                   <img
//                                     src={urlFor(img).width(800).url()}
//                                     alt=""
//                                   />
//                                 </div>
//                               </SwiperSlide>
//                             );
//                           })}
//                         </Swiper>
//                       );
//                     }
//                   },
//                 },
//               }}
//             />
//           </section>
//         ))}

//         <Contact />
//         <Footer footerId="b7255e10-bfe9-4109-84b1-ca3843fb040c" />
//       </div>
//     </Layout>
//   );
// };

// /* ================= MAIN APP ================= */

// function App() {
//   const [customSections, setCustomSections] = useState([]);
//   const [settings, setSettings] = useState(null);

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type=="customSection" && showSection==true && !defined(pageSlug)]
//         | order(order asc, _createdAt asc){
//           _id,
//           title,
//           slug,
//           layout,
//           backgroundColor,
//           textAlign,
//           paddingTop,
//           paddingBottom,
//           content
//         }`
//       )
//       .then(setCustomSections);

//     client.fetch(`*[_type=="siteSettings"][0]`).then(setSettings);
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* HOME (unchanged)
//         {/* <Route
//   path="/"
//   element={
//     <HomePage
//       customSections={customSections}
//       settings={settings}
//     />
//   }
// /> */}
//         {/* <Route path="/" element={<DynamicPage />} /> */}
//         {/* HOME - OLD TILE WEBSITE */}
//         <Route
//           path="/"
//           element={
//             <HomePage
//               customSections={customSections}
//               settings={settings}
//             />
//           }
//         />

//         {/* 🔥 FIXED MULTI-PAGE ROUTE */}
//         <Route path="/:slug" element={<DynamicPage />} />
//         <Route
//           path="/website-preview"
//           element={<WebsitePreview />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import DynamicPage from "./components/DynamicPage";
// import WebsitePreview from "./WebsitePreview";

// import "./index.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ============================================================
//             HOME
//             DynamicPage internally converts "/" to slug "home".
//             It first checks the new Website architecture and then
//             falls back to the existing legacy Page architecture.
//         ============================================================ */}
//         <Route path="/" element={<DynamicPage />} />

//         {/* ============================================================
//             MULTI-WEBSITE / LEGACY PAGE ROUTES

//             Examples:
//               /restaurant
//               /portfolio
//               /about
//               /any-website-slug
//         ============================================================ */}
//         <Route path="/:slug" element={<DynamicPage />} />

//         {/* ============================================================
//             WEBSITE PREVIEW
//         ============================================================ */}
//         <Route
//           path="/website-preview"
//           element={<WebsitePreview />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DynamicPage from "./components/DynamicPage";
import WebsitePreview from "./WebsitePreview";

import "./index.css";

function App() {
  // Fix accidental double-slash URLs such as:
  // http://localhost:5174//rr-resort
  // → http://localhost:5174/rr-resort
  const pathname = window.location.pathname;

  if (pathname.startsWith("//")) {
    const cleanPath = pathname.replace(/^\/+/, "/");

    window.history.replaceState(
      {},
      "",
      cleanPath + window.location.search + window.location.hash
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<DynamicPage />}
        />

        {/* WebWeave websites */}
        <Route
          path="/:slug"
          element={<DynamicPage />}
        />

        {/* Website Preview */}
        <Route
          path="/website-preview"
          element={<WebsitePreview />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;