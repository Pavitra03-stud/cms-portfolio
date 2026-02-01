import { useEffect, useState } from "react";
import client from "../sanityClient";
import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import "../styles/layout.css";

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

const Layout = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [layout, setLayout] = useState("top");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 🎨 Site settings
    client.fetch(siteQuery).then((data) => {
      if (!data) return;
      const root = document.documentElement;
      root.style.setProperty("--font-family", data.fontFamily || "inherit");
      root.style.setProperty("--base-font-size", data.baseFontSize || "16px");
      root.style.setProperty("--heading-color", data.headingColor || "#fff");
      root.style.setProperty("--text-color", data.textColor || "#ddd");
      root.style.setProperty("--accent-color", data.accentColor || "#ff7ab6");
      root.style.setProperty("--site-bg", data.backgroundColor || "#000");
    });

    // 🧭 Navigation layout
    client.fetch(navQuery).then((nav) => {
      if (nav?.layout) setLayout(nav.layout);
      setLoaded(true);
    });

    // 📱 Mobile detection
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
      {/* 🔥 NAVIGATION RULES */}

      {/* Desktop */}
      {!isMobile && layout === "top" && <Navbar isMobile={false} />}
      {!isMobile && layout === "side" && <SideNavbar />}

      {/* Mobile → ALWAYS hamburger */}
      {isMobile && <Navbar isMobile={true} />}

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
