import { useEffect, useState } from "react";
import client from "../sanityClient";
import "../styles/SideNavbar.css";

const navQuery = `*[_type=="navigation"][0]{
  siteTitle,
  menuItems[]{
    label,
    link,
    order,
    show
  }
}`;

const SideNavbar = () => {
  const [nav, setNav] = useState(null);

  useEffect(() => {
    client.fetch(navQuery).then(setNav);
  }, []);

  if (!nav) return null;

  const items = nav.menuItems
    ?.filter(item => item.show)
    ?.sort((a, b) => a.order - b.order);

  return (
    <aside className="side-navbar">
      {/* LOGO */}
      <div className="side-logo">
        {nav.siteTitle || "PAVITRA G V"}
      </div>

      {/* MENU */}
      <nav className="side-menu">
        {items?.map((item, index) => (
          <a key={index} href={item.link}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a href="#contact" className="side-cta">
        Connect With Me
      </a>
    </aside>
  );
};

export default SideNavbar;
