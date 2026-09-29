// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import Navbar from "./Navbar";
// import SideNavbar from "./SideNavbar";
// import "../styles/layout.css";

// /* ================= QUERIES ================= */

// const siteQuery = `*[_type=="siteSettings"][0]{
//   typography {
//     fontFamily,
//     baseFontSize,
//     headingColor,
//     textColor,
//     accentColor
//   },
//   backgroundColor
// }`;

// //const navQuery = `*[_type=="navigation"][0]{ layout }`;
// const navQuery = `*[
//   _type=="navigation" &&
//   _id==$navigationId
// ][0]{ layout }`;

// /* 🔥 DYNAMIC PAGES */
// const pagesQuery = `*[_type=="page" && showInNavbar==true] | order(_createdAt asc){
//   title,
//   "slug": slug.current
// }`;

// /* ================= COMPONENT ================= */

// // const Layout = ({ children, customMenu = null }) => {
//   const TILE_NAVIGATION_ID = "cde8eed9-bd63-4c3d-a59e-7cd5281b0ded";

// const Layout = ({
//   children,
//   customMenu = null,
//   navigationId = TILE_NAVIGATION_ID,
// }) => {
//   const [loaded, setLoaded] = useState(false);
//   const [layout, setLayout] = useState("top");
//   const [isMobile, setIsMobile] = useState(false);
//   const [pages, setPages] = useState([]);

//   useEffect(() => {
//     /* ================= SITE SETTINGS ================= */
//     client.fetch(siteQuery).then((data) => {
//       if (!data) return;

//       const root = document.documentElement;

//       root.style.setProperty(
//         "--font-family",
//         data.typography?.fontFamily || "inherit"
//       );
//       root.style.setProperty(
//         "--base-font-size",
//         data.typography?.baseFontSize || "16px"
//       );
//       root.style.setProperty(
//         "--heading-color",
//         data.typography?.headingColor || "#fff"
//       );
//       root.style.setProperty(
//         "--text-color",
//         data.typography?.textColor || "#ddd"
//       );
//       root.style.setProperty(
//         "--accent-color",
//         data.typography?.accentColor || "#ff7ab6"
//       );
//       root.style.setProperty(
//         "--site-bg",
//         data.backgroundColor || "#000"
//       );
//     });

//     /* ================= NAVIGATION LAYOUT ================= */
//   //  client.fetch(navQuery).then((nav) => {
//   //     setLayout(nav?.layout || "top");
//   //     setLoaded(true);
//   //   });
//   client
//   .fetch(navQuery, { navigationId })
//   .then((nav) => {
//     setLayout(nav?.layout || "top");
//     setLoaded(true);
//   });

//     /* ================= FETCH PAGES ================= */
//     client.fetch(pagesQuery).then((data) => {
//       setPages(data || []);
//     });

//     /* ================= MOBILE DETECTION ================= */
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, [navigationId]);

//   if (!loaded) return null;

//   return (
//     <div className={`layout layout-${layout}`}>

//       {/* ================= NAVIGATION ================= */}

//       {/* Desktop Top */}
//       {!isMobile && layout === "top" && (
//         // <Navbar
//         //   isMobile={false}
//         //   pages={pages}
//         //   customMenu={customMenu} // 🔥 NEW
//         // />
//         <Navbar
//   isMobile={false}
//   pages={pages}
//   customMenu={customMenu}
//   navigationId={navigationId}
// />
//       )}

//       {/* Desktop Side */}
//       {!isMobile && layout === "side" && (
//         <SideNavbar pages={pages} />
//       )}

//       {/* Mobile */}
//       {isMobile && (
//         // <Navbar
//         //   isMobile={true}
//         //   pages={pages}
//         //   customMenu={customMenu} // NEW
//         // />
//         <Navbar
//   isMobile={true}
//   pages={pages}
//   customMenu={customMenu}
//   navigationId={navigationId}
// />
//       )}

//       {/* ================= CONTENT ================= */}
//       <main className="main-content">{children}</main>

//     </div>
//   );
// };

// export default Layout;


// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import Navbar from "./Navbar";
// import SideNavbar from "./SideNavbar";
// import "../styles/layout.css";

// /* ================= QUERIES ================= */

// const siteQuery = `*[_type=="siteSettings"][0]{
//   typography {
//     fontFamily,
//     baseFontSize,
//     headingColor,
//     textColor,
//     accentColor
//   },
//   backgroundColor
// }`;

// const navQuery = `*[
//   _type=="navigation" &&
//   _id==$navigationId
// ][0]{ layout }`;

// /* 🔥 DYNAMIC PAGES */
// const pagesQuery = `*[_type=="page" && showInNavbar==true] | order(_createdAt asc){
//   title,
//   "slug": slug.current
// }`;

// /* ================= COMPONENT ================= */

// const TILE_NAVIGATION_ID =
//   "cde8eed9-bd63-4c3d-a59e-7cd5281b0ded";

// const Layout = ({
//   children,
//   customMenu = null,
//   navigationId = TILE_NAVIGATION_ID,
// }) => {
//   const [loaded, setLoaded] = useState(false);
//   const [layout, setLayout] = useState("top");
//   const [isMobile, setIsMobile] = useState(false);
//   const [pages, setPages] = useState([]);

//   useEffect(() => {
//     /* ================= SITE SETTINGS ================= */

//     client.fetch(siteQuery).then((data) => {
//       if (!data) return;

//       const root = document.documentElement;

//       root.style.setProperty(
//         "--font-family",
//         data.typography?.fontFamily || "inherit"
//       );

//       root.style.setProperty(
//         "--base-font-size",
//         data.typography?.baseFontSize || "16px"
//       );

//       root.style.setProperty(
//         "--heading-color",
//         data.typography?.headingColor || "#fff"
//       );

//       root.style.setProperty(
//         "--text-color",
//         data.typography?.textColor || "#ddd"
//       );

//       root.style.setProperty(
//         "--accent-color",
//         data.typography?.accentColor || "#ff7ab6"
//       );

//       root.style.setProperty(
//         "--site-bg",
//         data.backgroundColor || "#000"
//       );
//     });

//     /* ================= NAVIGATION LAYOUT ================= */

//     client
//       .fetch(navQuery, { navigationId })
//       .then((nav) => {
//         setLayout(nav?.layout || "top");
//         setLoaded(true);
//       });

//     /* ================= FETCH PAGES ================= */

//     client.fetch(pagesQuery).then((data) => {
//       setPages(data || []);
//     });

//     /* ================= MOBILE DETECTION ================= */

//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);

//     return () =>
//       window.removeEventListener("resize", handleResize);
//   }, [navigationId]);

//   if (!loaded) return null;

//   return (
//     <div className={`layout layout-${layout}`}>

//       {/* ================= NAVIGATION ================= */}

//       {/* Desktop Top */}
//       {!isMobile && layout === "top" && (
//         <Navbar
//           isMobile={false}
//           pages={pages}
//           customMenu={customMenu}
//           navigationId={navigationId}
//         />
//       )}

//       {/* Desktop Side */}
//       {!isMobile && layout === "side" && (
//         <SideNavbar pages={pages} />
//       )}

//       {/* Mobile */}
//       {isMobile && (
//         <Navbar
//           isMobile={true}
//           pages={pages}
//           customMenu={customMenu}
//           navigationId={navigationId}
//         />
//       )}

//       {/* ================= CONTENT ================= */}

//       <main className="main-content">
//         {children}
//       </main>

//     </div>
//   );
// };

// export default Layout;



import { useEffect, useState } from "react";
import client from "../sanityClient";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import "../styles/layout.css";

/* ================= QUERIES ================= */

const siteQuery = `*[_type=="siteSettings"][0]{
  typography {
    fontFamily,
    baseFontSize,
    headingColor,
    textColor,
    accentColor
  },
  backgroundColor
}`;

const navQuery = `*[
  _type=="navigation" &&
  _id==$navigationId
][0]{
  layout
}`;

/* 🔥 DYNAMIC PAGES */
const pagesQuery = `*[_type=="page" && showInNavbar==true] | order(_createdAt asc){
  title,
  "slug": slug.current
}`;

/* ================= COMPONENT ================= */

const TILE_NAVIGATION_ID =
  "cde8eed9-bd63-4c3d-a59e-7cd5281b0ded";

const Layout = ({
  children,
  customMenu = null,

  // If a Website supplies a navigationId, use that.
  // Otherwise preserve the existing TileLux navigation.
  navigationId = TILE_NAVIGATION_ID,

  // WebWeave Website object can be supplied by DynamicPage.
  website = null,
}) => {
 // const [loaded, setLoaded] = useState(false);
 const [loadedNavigationId, setLoadedNavigationId] = useState(null);
  const [layout, setLayout] = useState("top");
  const [isMobile, setIsMobile] = useState(false);
  const [pages, setPages] = useState([]);

  // Prefer the Website's exact Navigation reference when available.
  const resolvedNavigationId =
    website?.navigation?._ref ||
    navigationId ||
    TILE_NAVIGATION_ID;

  useEffect(() => {
    let cancelled = false;

   // setLoaded(false);

    /* ================= SITE SETTINGS ================= */

    client
      .fetch(siteQuery)
      .then((data) => {
        if (cancelled || !data) return;

        const root = document.documentElement;

        root.style.setProperty(
          "--font-family",
          data.typography?.fontFamily || "inherit"
        );

        root.style.setProperty(
          "--base-font-size",
          data.typography?.baseFontSize || "16px"
        );

        root.style.setProperty(
          "--heading-color",
          data.typography?.headingColor || "#fff"
        );

        root.style.setProperty(
          "--text-color",
          data.typography?.textColor || "#ddd"
        );

        root.style.setProperty(
          "--accent-color",
          data.typography?.accentColor || "#ff7ab6"
        );

        root.style.setProperty(
          "--site-bg",
          data.backgroundColor || "#000"
        );
      })
      .catch((error) => {
        console.error("SITE SETTINGS ERROR:", error);
      });

    /* ================= NAVIGATION LAYOUT ================= */

    client
      .fetch(navQuery, {
        navigationId: resolvedNavigationId,
      })
      .then((nav) => {
        if (cancelled) return;

        // setLayout(nav?.layout || "top");
        // setLoaded(true);
        setLayout(nav?.layout || "top");
setLoadedNavigationId(resolvedNavigationId);
      })
      .catch((error) => {
        if (cancelled) return;

        console.error("NAVIGATION LAYOUT ERROR:", error);

        // Preserve the existing layout fallback.
        // setLayout("top");
        // setLoaded(true);
        setLayout("top");
setLoadedNavigationId(resolvedNavigationId);
      });

    /* ================= FETCH PAGES ================= */

    client
      .fetch(pagesQuery)
      .then((data) => {
        if (!cancelled) {
          setPages(data || []);
        }
      })
      .catch((error) => {
        console.error("PAGES FETCH ERROR:", error);

        if (!cancelled) {
          setPages([]);
        }
      });

    /* ================= MOBILE DETECTION ================= */

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedNavigationId]);

 // if (!loaded) return null;
 if (loadedNavigationId !== resolvedNavigationId) return null;

  return (
    <div className={`layout layout-${layout}`}>

      {/* ================= NAVIGATION ================= */}

      {/* Desktop Top */}
      {!isMobile && layout === "top" && (
        <Navbar
          isMobile={false}
          pages={pages}
          customMenu={customMenu}
          navigationId={resolvedNavigationId}
        />
      )}

      {/* Desktop Side */}
      {!isMobile && layout === "side" && (
        <SideNavbar
          pages={pages}
          navigationId={resolvedNavigationId}
        />
      )}

      {/* Mobile */}
      {isMobile && (
        <Navbar
          isMobile={true}
          pages={pages}
          customMenu={customMenu}
          navigationId={resolvedNavigationId}
        />
      )}

      {/* ================= CONTENT ================= */}

      <main className="main-content">
        {children}
      </main>

    </div>
  );
};

export default Layout;
