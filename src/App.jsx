import { useEffect, useState } from "react";
import client from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";

import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import DynamicPage from "./components/DynamicPage";
import Footer from "./components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PortableText } from "@portabletext/react";
import "./index.css";

/* 🔥 ROUTER */
import { BrowserRouter, Routes, Route } from "react-router-dom";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

/* ================= HOME PAGE ================= */

const HomePage = ({ customSections, settings }) => {
  return (
    <Layout>
      <div
        style={{
          backgroundColor: settings?.backgroundColor || "#0f172a",
          minHeight: "100vh",
        }}
      >
        {/* DEFAULT SECTIONS */}
        <Hero />
        <About />
        <Services />
        <Portfolio />

        {/* CUSTOM SECTIONS */}
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
            {section.title && (
              <h2 className="custom-title">{section.title}</h2>
            )}

            <PortableText
              value={section.content}
              components={{
                types: {
                  button: ({ value }) => (
                    <div
                      style={{
                        textAlign: value?.align || "left",
                        marginTop: "20px",
                      }}
                    >
                      <a
                        href={value?.link || "#"}
                        className={`custom-btn ${value?.style || "primary"}`}
                      >
                        {value?.text || "Click"}
                      </a>
                    </div>
                  ),

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

                  imageGallery: ({ value }) => {
                    if (!value?.images?.length) return null;

                    if (value.display === "grid") {
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
                    }

                    if (value.display === "carousel") {
                      return (
                        <Swiper
                          modules={[Navigation, Pagination, Autoplay]}
                          spaceBetween={30}
                          navigation
                          pagination={{ clickable: true }}
                          autoplay={{ delay: 2500 }}
                          loop={true}
                          breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                          }}
                        >
                          {value.images.map((img, index) => {
                            if (!img?.asset) return null;

                            return (
                              <SwiperSlide key={index}>
                                <div
                                  className={`gallery-item ${
                                    value?.shape || "rectangle"
                                  }`}
                                >
                                  <img
                                    src={urlFor(img).width(800).url()}
                                    alt=""
                                  />
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      );
                    }
                  },
                },
              }}
            />
          </section>
        ))}

        <Contact />
      </div>
    </Layout>
  );
};

/* ================= MAIN APP ================= */

function App() {
  const [customSections, setCustomSections] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="customSection" && showSection==true && !defined(pageSlug)]
        | order(order asc, _createdAt asc){
          _id,
          title,
          slug,
          layout,
          backgroundColor,
          textAlign,
          paddingTop,
          paddingBottom,
          content
        }`
      )
      .then(setCustomSections);

    client.fetch(`*[_type=="siteSettings"][0]`).then(setSettings);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME (unchanged) */}
        {/* <Route
  path="/"
  element={
    <HomePage
      customSections={customSections}
      settings={settings}
    />
  }
/> */}
       <Route path="/" element={<DynamicPage />} />

        {/* 🔥 FIXED MULTI-PAGE ROUTE */}
        <Route path="/:slug" element={<DynamicPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;