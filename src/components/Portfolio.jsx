import "../styles/Portfolio.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

/* ================= QUERY ================= */
const portfolioQuery = `*[_type=="portfolio"][0]{
  heading,
  headingAlign,
  gridLayout,
  textAlign,
  backgroundColor,
  showSection,
  projects[]{
    _key,
    title,
    description,
    image{
      asset->
    },
    imageShape,
    alignment,     // 🔥 NEW (per project alignment)
    projectUrl,
    showProject
  }
}`;

/* ================= PORTABLE TEXT ================= */
const portableComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="portfolio-quote">{children}</blockquote>
    ),
  },
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    client.fetch(portfolioQuery).then(setPortfolio);
  }, []);

  if (!portfolio?.showSection) return null;

  return (
    <section
      className="portfolio"
      id="projects"
      style={{
        backgroundColor: portfolio.backgroundColor || "transparent",
        textAlign: portfolio.textAlign || "left",
      }}
    >
      {/* ================= HEADING ================= */}
      {portfolio.heading && (
        <div
          className={`portfolio-title ${
            portfolio.headingAlign || "center"
          }`}
        >
          <PortableText
            value={portfolio.heading}
            components={portableComponents}
          />
        </div>
      )}

      {/* ================= GRID ================= */}
      <div
        className={`portfolio-grid ${
          portfolio.gridLayout || "three"
        }`}
      >
        {portfolio.projects
          ?.filter((project) => project.showProject)
          .map((project) => (
            <div
              key={project._key}
              className={`portfolio-card ${
                project.alignment || "center"
              }`}
            >
              <div
                className={`portfolio-image-wrapper ${
                  project.imageShape || "rectangle"
                }`}
              >
                {project.image?.asset && (
                  <img
                    src={urlFor(project.image).width(800).url()}
                    alt="Project"
                    className="portfolio-img"
                  />
                )}

                <div className="portfolio-overlay">
                  {project.title && (
                    <PortableText
                      value={project.title}
                      components={portableComponents}
                    />
                  )}

                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>

              {project.description && (
                <div className="portfolio-description">
                  <PortableText
                    value={project.description}
                    components={portableComponents}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Portfolio;