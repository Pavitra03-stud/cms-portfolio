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

const navQuery = `*[_type=="navigation"][0]{ layout }`;

/* 🔥 DYNAMIC PAGES */
const pagesQuery = `*[_type=="page" && showInNavbar==true] | order(_createdAt asc){
  title,
  "slug": slug.current
}`;

/* ================= COMPONENT ================= */

const Layout = ({ children, customMenu = null }) => {
  const [loaded, setLoaded] = useState(false);
  const [layout, setLayout] = useState("top");
  const [isMobile, setIsMobile] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    /* ================= SITE SETTINGS ================= */
    client.fetch(siteQuery).then((data) => {
      if (!data) return;

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
    });

    /* ================= NAVIGATION LAYOUT ================= */
    client.fetch(navQuery).then((nav) => {
      setLayout(nav?.layout || "top");
      setLoaded(true);
    });

    /* ================= FETCH PAGES ================= */
    client.fetch(pagesQuery).then((data) => {
      setPages(data || []);
    });

    /* ================= MOBILE DETECTION ================= */
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!loaded) return null;

  return (
    <div className={`layout layout-${layout}`}>

      {/* ================= NAVIGATION ================= */}

      {/* Desktop Top */}
      {!isMobile && layout === "top" && (
        <Navbar
          isMobile={false}
          pages={pages}
          customMenu={customMenu} // 🔥 NEW
        />
      )}

      {/* Desktop Side */}
      {!isMobile && layout === "side" && (
        <SideNavbar pages={pages} />
      )}

      {/* Mobile */}
      {isMobile && (
        <Navbar
          isMobile={true}
          pages={pages}
          customMenu={customMenu} // NEW
        />
      )}

      {/* ================= CONTENT ================= */}
      <main className="main-content">{children}</main>

    </div>
  );
};

export default Layout;