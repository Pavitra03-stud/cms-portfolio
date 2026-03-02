// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import "../styles/SideNavbar.css";

// const navQuery = `*[_type=="navigation"][0]{
//   siteTitle,
//   menuItems[]{
//     label,
//     link,
//     order,
//     show
//   }
// }`;

// const SideNavbar = () => {
//   const [nav, setNav] = useState(null);

//   useEffect(() => {
//     client.fetch(navQuery).then(setNav);
//   }, []);

//   if (!nav) return null;

//   const items = nav.menuItems
//     ?.filter(item => item.show)
//     ?.sort((a, b) => a.order - b.order);

//   return (
//     <aside className="side-navbar">
//       {/* LOGO */}
//       <div className="side-logo">
//         {nav.siteTitle || "PAVITRA G V"}
//       </div>

//       {/* MENU */}
//       <nav className="side-menu">
//         {items?.map((item, index) => (
//           <a key={index} href={item.link}>
//             {item.label}
//           </a>
//         ))}
//       </nav>

//       {/* CTA */}
//       <a href="#contact" className="side-cta">
//         Connect With Me
//       </a>
//     </aside>
//   );
// };

// export default SideNavbar;


import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";
import "../styles/SideNavbar.css";

const navQuery = `*[_type=="navigation"][0]{
  siteTitle,
  menuItems[]{
    _key,
    label,
    link,
    order,
    show
  }
}`;

const SideNavbar = () => {
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const data = await client.fetch(navQuery);
        setNav(data);
      } catch (error) {
        console.error("Navigation fetch error:", error);
      }
    };

    fetchNav();
  }, []);

  if (!nav) return null;

  const items = nav.menuItems
    ?.filter((item) => item.show)
    ?.sort((a, b) => a.order - b.order);

  return (
    <aside className="side-navbar">
      
      {/* LOGO */}
      <div className="side-logo">
        {nav.siteTitle ? (
          <PortableText value={nav.siteTitle} />
        ) : (
          "PAVITRA G V"
        )}
      </div>

      {/* MENU */}
      <nav className="side-menu">
        {items?.map((item) => (
          <a key={item._key} href={item.link}>
            {item.label && (
              <PortableText value={item.label} />
            )}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        className="side-cta"
        onClick={(e) => {
          e.preventDefault();
          document
            .querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Connect With Me
      </a>
    </aside>
  );
};

export default SideNavbar;
