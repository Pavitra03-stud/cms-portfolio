import { useEffect, useState } from "react";
//import client from "./sanityClient";
//import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

//const builder = imageUrlBuilder(client);

//const urlFor = (source) => builder.image(source);

// const heroQuery = `
//   *[_type == "hero" && _id == $heroId][0]{
//     name,
//     role,
//     tagline,
//     heroImage,
//     "heroBackgroundUrl": heroBackground.asset->url,
//     useBackgroundImage,
//     overlayColor,
//     showOverlay,
//     heroHeight,
//     backgroundPosition,
//     backgroundSize,
//     imageShape,
//     imagePosition,
//     textAlign,
//     backgroundColor,
//     buttonPosition,
//     buttons[]{
//       label,
//       url,
//       variant,
//       backgroundColor,
//       textColor,
//       borderColor,
//       openInNewTab
//     },
//     "resumeUrl": resumeFile.asset->url,
//     showSection
//   }
// `;

export default function WebsitePreview() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const heroId = params.get("hero");

  //   if (!heroId) {
  //     setLoading(false);
  //     return;
  //   }

  //   fetch(
  //     `http://localhost:5000/api/preview/hero/${heroId}`
  //   )
  //     .then(async (response) => {
  //       const result = await response.json();

  //       if (!response.ok) {
  //         throw new Error(
  //           result?.message ||
  //           "Could not load Hero preview."
  //         );
  //       }

  //       return result;
  //     })
  //     .then((result) => {
  //       console.log("Preview Hero:", result.hero);
  //       setHero(result.hero);
  //     })
  //     .catch((error) => {
  //       console.error("Preview error:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const heroId = params.get("hero");

  if (!heroId) {
    return;
  }

  let isMounted = true;

  fetch(`http://localhost:5000/api/preview/hero/${heroId}`)
    .then(async (response) => {
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Could not load Hero preview."
        );
      }

      return result;
    })
    .then((result) => {
      if (isMounted) {
        console.log("Preview Hero:", result.hero);
        setHero(result.hero);
      }
    })
    .catch((error) => {
      console.error("Preview error:", error);
    })
    .finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

  return () => {
    isMounted = false;
  };
}, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#ffffff",
          fontSize: "18px",
        }}
      >
        Loading preview...
      </div>
    );
  }

  if (!hero) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#ffffff",
        }}
      >
        Hero preview not found.
      </div>
    );
  }

  if (hero.showSection === false) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#ffffff",
        }}
      >
        Hero section is disabled.
      </div>
    );
  }

  const backgroundImage =
    hero.useBackgroundImage && hero.heroBackgroundUrl
      ? `url(${hero.heroBackgroundUrl})`
      : "none";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: hero.backgroundColor || "#09090b",
        backgroundImage,
        backgroundPosition:
          hero.backgroundPosition || "center",
        backgroundSize:
          hero.backgroundSize || "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        color: "#ffffff",
      }}
    >
      {/* OVERLAY */}

      {hero.showOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              hero.overlayColor || "rgba(0,0,0,0.35)",
          }}
        />
      )}

      {/* HERO CONTENT */}

      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight:
            hero.heroHeight || "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent:
            hero.imagePosition === "left"
              ? "flex-start"
              : hero.imagePosition === "right"
                ? "flex-end"
                : "center",
          padding: "80px 7%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* TEXT */}

          <div
            style={{
              flex: "1 1 450px",
              textAlign:
                hero.textAlign || "left",
            }}
          >
            {hero.name && (
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(42px, 7vw, 82px)",
                  lineHeight: "1.05",
                  fontWeight: 800,
                  letterSpacing: "-3px",
                }}
              >
                <PortableText value={hero.name} />
              </h1>
            )}

            {hero.role && (
              <h2
                style={{
                  marginTop: "18px",
                  marginBottom: 0,
                  fontSize: "clamp(22px, 3vw, 38px)",
                  fontWeight: 600,
                }}
              >
                <PortableText value={hero.role} />
              </h2>
            )}

            {hero.tagline && (
              <div
                style={{
                  marginTop: "22px",
                  maxWidth: "650px",
                  fontSize: "18px",
                  lineHeight: 1.7,
                  opacity: 0.8,
                }}
              >
                <PortableText value={hero.tagline} />
              </div>
            )}

            {/* BUTTONS */}

            {hero.buttons?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "30px",
                  justifyContent:
                    hero.buttonPosition === "center"
                      ? "center"
                      : hero.buttonPosition === "right"
                        ? "flex-end"
                        : "flex-start",
                }}
              >
                {hero.buttons.map(
                  (button, index) => (
                    <a
                      key={index}
                      href={button.url || "#"}
                      target={
                        button.openInNewTab
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        button.openInNewTab
                          ? "noreferrer"
                          : undefined
                      }
                      style={{
                        padding: "13px 24px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        background:
                          button.backgroundColor ||
                          "#ffffff",
                        color:
                          button.textColor ||
                          "#09090b",
                        border:
                          `1px solid ${button.borderColor ||
                          "transparent"
                          }`,
                        fontWeight: 600,
                      }}
                    >
                      <PortableText
                        value={button.label}
                      />
                    </a>
                  )
                )}
              </div>
            )}
          </div>

          {/* HERO IMAGE */}

          {hero.heroImage && (
            <div
              style={{
                flex: "0 1 420px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={hero.heroImageUrl}
                alt=""
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  height: "420px",
                  objectFit: "cover",
                  borderRadius:
                    hero.imageShape === "circle"
                      ? "50%"
                      : hero.imageShape === "diamond"
                        ? "30px"
                        : hero.imageShape === "star"
                          ? "30px"
                          : "18px",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* BACK TO CMS */}

      {/* <button
        onClick={() => window.history.back()}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 10,
          padding: "10px 16px",
          borderRadius: "10px",
          border:
            "1px solid rgba(255,255,255,0.15)",
          background:
            "rgba(0,0,0,0.5)",
          color: "#ffffff",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
        }}
      >
        ← Back to Editor
      </button> */}
      <button
        onClick={() => {
          const params = new URLSearchParams(window.location.search);
          const heroId = params.get("hero");

          if (heroId) {
            window.location.href = `http://localhost:3333/structure/hero;${heroId}`;
          }
        }}
        style={{
          position: "fixed",
          top: "20px",
          left: "24px",
          zIndex: 10,
          padding: "10px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ← Back to Editor
      </button>
    </div>
  );
}