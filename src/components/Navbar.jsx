import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const navQuery = `*[_type=="navigation"][0]{
  siteTitle,
  layout,
  textColor,
  backgroundColor,
  menuItems[]{
    _key,
    label,
    link,
    order,
    show,
    subMenu[]{
      label,
      link,
      subMenu[]{
        label,
        link,
        subMenu[]{
          label,
          link
        }
      }
    }
  },
  ctaButtons[]{
  _key,
  text,
  link,
  showButton,
  buttonColor,
  textColor,
  borderColor,
  hoverBackgroundColor,
  hoverTextColor,
  variant,
  borderRadius,
  paddingX,
  paddingY,
  align
}
}`;

const portableComponents = {
  block: {
    normal: ({ children }) => <span>{children}</span>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote>{children}</blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => (
      <span style={{ textDecoration: "underline" }}>
        {children}
      </span>
    ),

    "strike-through": ({ children }) => (
      <span style={{ textDecoration: "line-through" }}>
        {children}
      </span>
    ),

    code: ({ children }) => <code>{children}</code>,

    textColor: ({ children, value }) => (
      <span style={{ color: value?.color }}>
        {children}
      </span>
    ),

    fontSize: ({ children, value }) => (
      <span style={{ fontSize: value?.size }}>
        {children}
      </span>
    ),

    fontFamily: ({ children, value }) => (
      <span style={{ fontFamily: value?.family }}>
        {children}
      </span>
    ),
  },
};

const Navbar = ({ isMobile, customMenu = null }) => {
  const [nav, setNav] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  // useEffect(() => {
  //   client.fetch(navQuery).then((data) => setNav(data || null));
  // }, []);
  useEffect(() => {
  client.fetch(navQuery).then((data) => {
    console.log("NAVBAR DATA:", data);
    setNav(data || null);
  });
}, []);

  /* ================= SCROLL SPY ================= */
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!nav) return null;

  const menu = (
    customMenu
      ? customMenu
      : (nav.menuItems || []).filter((item) => item?.show)
  ).sort((a, b) => (a.order || 0) - (b.order || 0));

  const buttons = (nav.ctaButtons || []).filter((b) => b.showButton);

  /* ================= SCROLL FUNCTION ================= */
  const handleScroll = (e, link) => {
    if (!link.startsWith("#")) return;

    e.preventDefault();

    const id = link.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    setOpen(false);
  };

  /* ================= RECURSIVE SUBMENU ================= */
  const renderSubMenu = (items) => {
    return items?.map((sub, i) => (
      <div key={i} className="submenu-item">

        <Link
          to={sub.link?.startsWith("#") ? "#" : `/${sub.link}`}
          className="submenu-link"
          onClick={(e) => {
            if (sub.link?.startsWith("#")) {
              handleScroll(e, sub.link);
            } else {
              setOpen(false);
            }
          }}
        >
          {/* {sub.label} */}
          <PortableText
            value={sub.label}
            components={portableComponents}
          />
        </Link>

        {sub.subMenu?.length > 0 && (
          <div className="nested-dropdown">
            {renderSubMenu(sub.subMenu)}
          </div>
        )}
      </div>
    ));
  };

  /* ================= MAIN MENU ================= */
  const renderLink = (item, isMobileMenu = false) => {
    const link = item?.link || "";
    const isOpen = openDropdown === item._key;

    const sectionId = link.replace("#", "");
    const isActive = activeSection === sectionId;

    const content = (
      <PortableText value={item?.label} components={portableComponents} />
    );

    return (
      <div key={item._key} className="menu-item">

        <div
          className={`menu-title ${isActive ? "active" : ""}`}
          onClick={() => {
            if (isMobileMenu && item.subMenu?.length > 0) {
              setOpenDropdown(isOpen ? null : item._key);
            }
          }}
        >
          <Link
            to={link.startsWith("#") ? "#" : link}
            onClick={(e) => handleScroll(e, link)}
          >
            {content}
          </Link>
        </div>

        {item.subMenu?.length > 0 && (
          <div
            className={`dropdown ${isMobileMenu
              ? isOpen
                ? "mobile-show"
                : "mobile-hide"
              : ""
              }`}
          >
            {renderSubMenu(item.subMenu)}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        className="navbar"
        style={{
          backgroundColor: nav?.backgroundColor || "#000",
          color: nav?.textColor || "#fff",
        }}
      >
        <div className="navbar-inner">

          {/* LOGO */}
          <div className="nav-left">
            {nav?.siteTitle && (
              <PortableText
                value={nav.siteTitle}
                components={portableComponents}
              />
            )}
          </div>

          {/* DESKTOP */}
          {!isMobile && (
            <nav className="nav-center">
              {menu.map((item) => renderLink(item))}
            </nav>
          )}

          {/* Desktop CTA only */}
          {!isMobile && (
            <div className="nav-buttons">
              {buttons.map((btn) => (
                <a
                  key={btn._key}
                  href={btn.link}
                  className={`nav-btn ${btn.variant || "filled"}`}
                  style={{
                    background: btn.buttonColor || "#111",
                    color: btn.textColor || "#fff",
                    border: `1px solid ${btn.borderColor || "transparent"}`,
                    borderRadius: btn.borderRadius || "999px",
                    padding: `${btn.paddingY || "12px"} ${btn.paddingX || "24px"}`
                  }}
                >
                  <PortableText value={btn.text} components={portableComponents} />
                </a>
              ))}
            </div>
          )}

          {/* MOBILE */}
          <div className="hamburger" onClick={() => setOpen(!open)}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
         <button
        className="close-menu"
        onClick={() => setOpen(false)}
    >
        ✕
    </button>
        {menu.map((item) => renderLink(item, true))}

        {/* {buttons.map((btn) => (
          <a key={btn._key} href={btn.link} className="mobile-cta">
            {btn.text}
          </a>
        ))} */}
        {buttons.map((btn) => (
          // <a key={btn._key} href={btn.link} className="mobile-cta">
          <a
            key={btn._key}
            href={btn.link}
            className={`mobile-cta ${btn.variant || "filled"}`}
            style={{
              background: btn.buttonColor || "#111",
              color: btn.textColor || "#fff",
              border: `1px solid ${btn.borderColor || "transparent"}`,
              borderRadius: btn.borderRadius || "999px",
              padding: `${btn.paddingY || "12px"} ${btn.paddingX || "24px"}`,
            }}
          >
            <PortableText
              value={btn.text}
              components={portableComponents}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;