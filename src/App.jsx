import { useEffect, useState } from "react";
import client from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

import { PortableText } from "@portabletext/react";
import "./index.css";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

function App() {
  const [customSections, setCustomSections] = useState([]);
  const [settings, setSettings] = useState(null); // 🔥 GLOBAL SETTINGS

  useEffect(() => {
  /* 🔥 FETCH CUSTOM SECTIONS (FULLY DYNAMIC) */
  client
    .fetch(`
      *[_type=="customSection" && showSection==true] 
      | order(order asc, _createdAt asc){
        _id,
        title,
        slug,
        layout,
        backgroundColor,
        textAlign,
        paddingTop,
        paddingBottom,
        order,
        content[]{
          ...,
          _type == "imageGallery" => {
            ...,
            shape,
            columns,
            images[]{
              ...,
              asset->
            }
          },
          _type == "image" => {
            ...,
            asset->
          }
        }
      }
    `)
    .then((data) => {
      console.log("CUSTOM SECTIONS:", data); // 🔥 Debug
      setCustomSections(data);
    });

  /*  FETCH SITE SETTINGS */
  client
    .fetch(`*[_type=="siteSettings"][0]`)
    .then(setSettings);

}, []);

  return (
    <Layout>
      {/* GLOBAL BACKGROUND CONTROL */}
      <div
        style={{
          backgroundColor: settings?.backgroundColor || "#0f172a",
          minHeight: "100vh"
        }}
      >
        {/* ===== DEFAULT SECTIONS ===== */}
        <Hero />
        <About />
        <Services />
        <Portfolio />

        {/* ===== CUSTOM SECTIONS ===== */}
        {customSections.map((section) => (
  <section
    key={section._id}
    id={section.slug}
    className={`custom-section ${section.layout || "center"}`}
    style={{
      backgroundColor: section.backgroundColor || "transparent",
      textAlign: section.textAlign || "left",
      paddingTop: section.paddingTop || "100px",
      paddingBottom: section.paddingBottom || "100px",
    }}
  >
    {/* ===== SECTION TITLE ===== */}
    {section.title && (
      <h2 className="custom-title">
        {section.title}
      </h2>
    )}

    {/* ===== CONTENT BUILDER ===== */}
    <PortableText
      value={section.content}
      components={{
        types: {

          /*  SINGLE IMAGE */
          image: ({ value }) => {
            if (!value?.asset) return null;

            return (
              <div
                className={`custom-image-wrapper ${
                  value.imageAlign || "center"
                }`}
              >
                <img
                  src={urlFor(value).width(1000).url()}
                  alt=""
                  className="custom-image"
                />
              </div>
            );
          },

          /*  IMAGE GALLERY */
          imageGallery: ({ value }) => {
            if (!value?.images?.length) return null;

            return (
              <div
                className={`custom-gallery ${
                  value?.columns || "three"
                } ${value?.galleryAlign || "center"}`}
              >
                {value.images.map((img, index) => {
                  if (!img?.asset) return null;

                  return (
                    <div
                      key={index}
                      className={`gallery-item ${
                        value?.shape || "rectangle"
                      }`}
                    >
                      <img
                        src={urlFor(img).width(600).url()}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            );
          },
        },
      }}
    />
  </section>
))}

        {/*  PASS SETTINGS TO CONTACT */}
        <Contact settings={settings} />
      </div>
    </Layout>
  );
}

export default App;