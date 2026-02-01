import { useEffect, useState } from "react";
import client from "../sanityClient";
import "../styles/Navbar.css";

const navQuery = `*[_type=="navigation"][0]{
  siteTitle,
  layout,
  fontSize,
  fontFamily,
  textColor,
  backgroundColor,
  menuItems[]{
    label,
    link,
    order,
    show
  }
}`;

const Navbar = () => {
  const [nav, setNav] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    client.fetch(navQuery).then(setNav);
  }, []);

  if (!nav) return null;

  const menu = nav.menuItems
    ?.filter(item => item.show)
    ?.sort((a, b) => a.order - b.order);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className="navbar"
        style={{
          backgroundColor: nav.backgroundColor || "#000",
          color: nav.textColor || "#fff",
          fontFamily: nav.fontFamily,
          fontSize: nav.fontSize,
        }}
      >
        <div className="navbar-inner">
          {/* LOGO */}
          <div className="nav-left">{nav.siteTitle}</div>

          {/* CENTER MENU (DESKTOP ONLY) */}
          <nav className="nav-center">
            {menu.map(item => (
              <a key={item.label} href={item.link}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA (DESKTOP ONLY) */}
          <button
            className="nav-btn"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Connect With Me
          </button>

          {/* HAMBURGER (MOBILE ONLY) */}
          <div className="hamburger" onClick={() => setOpen(!open)}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {menu.map(item => (
          <a
            key={item.label}
            href={item.link}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}

        <button
          className="mobile-cta"
          onClick={() => {
            setOpen(false);
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Connect With Me
        </button>
      </div>
    </>
  );
};

export default Navbar;
