// import { useEffect, useState } from "react";
// import client from "../sanityClient";
// import { PortableText } from "@portabletext/react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles/SideNavbar.css";

// /* ================= QUERY ================= */

// const navQuery = `*[_type=="navigation"][0]{
//   siteTitle,

//   menuItems[]{
//     _key,
//     label,
//     link,
//     order,
//     show
//   },

//   ctaButtons[]{
//   _key,
//     text,
//     link,
//     openInNewTab,
//     showButton,
//     buttonColor,
//     textColor
//   }
// }`;

// /* ================= COMPONENT ================= */

// const SideNavbar = () => {
//   const [nav, setNav] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchNav = async () => {
//       try {
//         const data = await client.fetch(navQuery);
//         setNav(data);
//       } catch (error) {
//         console.error("Navigation fetch error:", error);
//       }
//     };

//     fetchNav();
    
//   }, []);
  

//   if (!nav) return null;

//   const items = nav.menuItems
//     ?.filter((item) => item.show)
//     ?.sort((a, b) => a.order - b.order);

//   /* ================= LINK HANDLER ================= */

//   const renderLink = (item) => {
//     const link = item.link || "";

//     //  MULTI PAGE ROUTING
//     if (link.startsWith("/")) {
//       return (
//         <Link key={item._key} to={link}>
//           {item.label && <PortableText value={item.label} />}
//         </Link>
//       );
//     }

//     //  SINGLE PAGE SCROLL (ONLY HOME)
//     if (link.startsWith("#") && location.pathname === "/") {
//       return (
//         <a
//           key={item._key}
//           href={link}
//           onClick={(e) => {
//             e.preventDefault();
//             document
//               .querySelector(link)
//               ?.scrollIntoView({ behavior: "smooth" });
//           }}
//         >
//           {item.label && <PortableText value={item.label} />}
//         </a>
//       );
//     }

//     //  DEFAULT (fallback)
//     return (
//       <Link key={item._key} to={link}>
//         {item.label && <PortableText value={item.label} />}
//       </Link>
//     );
//   };

//   return (
//     <aside className="side-navbar">

//       {/* LOGO */}
//       <div className="side-logo">
//         {nav.siteTitle ? (
//           <PortableText value={nav.siteTitle} />
//         ) : (
//           "PAVITRA G V"
//         )}
//       </div>

//       {/* MENU */}
//       <nav className="side-menu">
//         {items?.map((item) => renderLink(item))}
//       </nav>

//       {/* CTA BUTTON */}
//       {/* CTA BUTTONS */}
// {nav.ctaButtons
//   ?.filter((btn) => btn.showButton)
//   .map((btn) =>
//     linkStartsWithSlash(btn.link) ? (
//       <Link
//         key={btn._key}
//         to={btn.link}
//         className="side-cta"
//         style={{
//           backgroundColor: btn.buttonColor || "#ff7ab6",
//           color: btn.textColor || "#fff",
//         }}
//       >
//         {btn.text || "Connect With Me"}
//       </Link>
//     ) : (
//       <a
//         key={btn._key}
//         href={btn.link || "#contact"}
//         target={btn.openInNewTab ? "_blank" : "_self"}
//         rel="noreferrer"
//         className="side-cta"
//         style={{
//           backgroundColor: btn.buttonColor || "#ff7ab6",
//           color: btn.textColor || "#fff",
//         }}
//         onClick={(e) => {
//           if (
//             btn.link?.startsWith("#") &&
//             location.pathname === "/"
//           ) {
//             e.preventDefault();
//             document
//               .querySelector(btn.link)
//               ?.scrollIntoView({ behavior: "smooth" });
//           }
//         }}
//       >
//         {btn.text || "Connect With Me"}
//       </a>
      
//     )
// )}


//     </aside>
//   );
// };

// /* ================= HELPER ================= */

// function linkStartsWithSlash(link) {
//   return typeof link === "string" && link.startsWith("/");
// }

// export default SideNavbar;


import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { Link, useLocation } from "react-router-dom";
import "../styles/SideNavbar.css";

/* ================= QUERY ================= */

const navQuery = `*[_type=="navigation"][0]{
  siteTitle,

  menuItems[]{
    _key,
    label,
    link,
    order,
    show
  },

  ctaButtons[]{
    _key,
    text,
    link,
    openInNewTab,
    showButton,
    buttonColor,
    textColor,
    borderColor,
    hoverBackgroundColor,
    hoverTextColor,
    variant,
    borderRadius,
    paddingX,
    paddingY
  }
}`;

/* ================= PORTABLE TEXT ================= */

const portableComponents = {
  block: {
    normal: ({ children }) => <span>{children}</span>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
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

/* ================= COMPONENT ================= */

const SideNavbar = () => {
  const [nav, setNav] = useState(null);
  const location = useLocation();

  useEffect(() => {
    client.fetch(navQuery).then((data) => {
      setNav(data || null);
    });
  }, []);

  if (!nav) return null;

  const items = (nav.menuItems || [])
    .filter((item) => item.show)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const buttons = (nav.ctaButtons || []).filter(
    (btn) => btn.showButton
  );

  /* ================= MENU LINK ================= */

  const renderLink = (item) => {
    const link = item.link || "";

    if (link.startsWith("#") && location.pathname === "/") {
      return (
        <a
          key={item._key}
          href={link}
          onClick={(e) => {
            e.preventDefault();

            document
              .querySelector(link)
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          <PortableText
            value={item.label}
            components={portableComponents}
          />
        </a>
      );
    }

    return (
      <Link key={item._key} to={link}>
        <PortableText
          value={item.label}
          components={portableComponents}
        />
      </Link>
    );
  };

  return (
    <aside className="side-navbar">

      {/* LOGO */}

      <div className="side-logo">
        <PortableText
          value={nav.siteTitle}
          components={portableComponents}
        />
      </div>

      {/* MENU */}

      <nav className="side-menu">
        {items.map(renderLink)}
      </nav>

      {/* CTA BUTTONS */}

      <div className="side-buttons">
        {buttons.map((btn) => {
          const style = {
            background: btn.buttonColor || "#D4A017",
            color: btn.textColor || "#fff",
            border: `1px solid ${
              btn.borderColor || "transparent"
            }`,
            borderRadius: btn.borderRadius || "999px",
            padding: `${btn.paddingY || "12px"} ${
              btn.paddingX || "24px"
            }`,
          };

          if (btn.link?.startsWith("/")) {
            return (
              <Link
                key={btn._key}
                to={btn.link}
                className="side-cta"
                style={style}
              >
                <PortableText
                  value={btn.text}
                  components={portableComponents}
                />
              </Link>
            );
          }

          return (
            <a
              key={btn._key}
              href={btn.link || "#"}
              className="side-cta"
              style={style}
              target={
                btn.openInNewTab ? "_blank" : "_self"
              }
              rel="noreferrer"
              onClick={(e) => {
                if (
                  btn.link?.startsWith("#") &&
                  location.pathname === "/"
                ) {
                  e.preventDefault();

                  document
                    .querySelector(btn.link)
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }
              }}
            >
              <PortableText
                value={btn.text}
                components={portableComponents}
              />
            </a>
          );
        })}
      </div>

    </aside>
  );
};

export default SideNavbar;