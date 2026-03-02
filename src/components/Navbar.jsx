// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import { PortableText } from "@portabletext/react";
// import "../styles/Navbar.css";

// const navQuery = `*[_type=="navigation"][0]{
//   siteTitle,
//   layout,
//   textColor,
//   backgroundColor,
//   menuItems[]{
//     label,
//     link,
//     order,
//     show
//   }
// }`;

// const portableComponents = {
//   block: {
//     normal: ({ children }) => <span>{children}</span>,
//   },
// };

// const Navbar = () => {
//   const [nav, setNav] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("");

//   useEffect(() => {
//     client.fetch(navQuery).then(setNav);
//   }, []);

//   /*  SCROLL DETECTION */
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll("section");
//       let current = "";

//       sections.forEach(section => {
//         const sectionTop = section.offsetTop - 120;
//         if (window.scrollY >= sectionTop) {
//           current = section.getAttribute("id");
//         }
//       });

//       setActiveSection(current);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (!nav) return null;

//   const menu = nav.menuItems
//     ?.filter(item => item.show)
//     ?.sort((a, b) => a.order - b.order);

//   return (
//     <>
//       <header
//         className="navbar"
//         style={{
//           backgroundColor: nav.backgroundColor || "#000",
//           color: nav.textColor || "#fff",
//         }}
//       >
//         <div className="navbar-inner">

//           {/* LOGO */}
//           <div className="nav-left">
//             {nav.siteTitle && (
//               <PortableText
//                 value={nav.siteTitle}
//                 components={portableComponents}
//               />
//             )}
//           </div>

//           {/* DESKTOP MENU */}
//           <nav className="nav-center">
//             {menu?.map((item, index) => {
//               const sectionId = item.link?.replace("#", "");
//               const isActive = activeSection === sectionId;

//               return (
//                 <a
//                   key={index}
//                   href={item.link}
//                   className={isActive ? "active" : ""}
//                 >
//                   {item.label && (
//                     <PortableText
//                       value={item.label}
//                       components={portableComponents}
//                     />
//                   )}
//                 </a>
//               );
//             })}
//           </nav>

//           {/* CTA */}
//           <button
//             className="nav-btn"
//             onClick={() =>
//               document
//                 .querySelector("#contact")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//           >
//             Connect With Me
//           </button>

//           {/* HAMBURGER */}
//           <div className="hamburger" onClick={() => setOpen(!open)}>
//             <span />
//             <span />
//             <span />
//           </div>

//         </div>
//       </header>

//       {/* MOBILE MENU */}
//       <div className={`mobile-menu ${open ? "open" : ""}`}>
//         {menu?.map((item, index) => {
//           const sectionId = item.link?.replace("#", "");
//           const isActive = activeSection === sectionId;

//           return (
//             <a
//               key={index}
//               href={item.link}
//               className={isActive ? "active" : ""}
//               onClick={() => setOpen(false)}
//             >
//               {item.label && (
//                 <PortableText
//                   value={item.label}
//                   components={portableComponents}
//                 />
//               )}
//             </a>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Navbar;


import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";
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
    show
  }
}`;

const portableComponents = {
  block: {
    normal: ({ children }) => <span>{children}</span>,
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

const Navbar = () => {
  const [nav, setNav] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const data = await client.fetch(navQuery);
        setNav(data);
      } catch (error) {
        console.error("Navbar fetch error:", error);
      }
    };

    fetchNav();
  }, []);

  /* SCROLL DETECTION */
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!nav) return null;

  const menu = nav.menuItems
    ?.filter((item) => item.show)
    ?.sort((a, b) => a.order - b.order);

  return (
    <>
      <header
        className="navbar"
        style={{
          backgroundColor: nav.backgroundColor || "#000",
          color: nav.textColor || "#fff",
        }}
      >
        <div className="navbar-inner">

          {/* LOGO */}
          <div className="nav-left">
            {nav.siteTitle && (
              <PortableText
                value={nav.siteTitle}
                components={portableComponents}
              />
            )}
          </div>

          {/* DESKTOP MENU */}
          <nav className="nav-center">
            {menu?.map((item) => {
              const sectionId = item.link?.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item._key}
                  href={item.link}
                  className={isActive ? "active" : ""}
                >
                  {item.label && (
                    <PortableText
                      value={item.label}
                      components={portableComponents}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
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

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {menu?.map((item) => {
          const sectionId = item.link?.replace("#", "");
          const isActive = activeSection === sectionId;

          return (
            <a
              key={item._key}
              href={item.link}
              className={isActive ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label && (
                <PortableText
                  value={item.label}
                  components={portableComponents}
                />
              )}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
