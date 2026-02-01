import "../styles/Portfolio.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

/* ================= IMAGE BUILDER ================= */
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

/* ================= SANITY QUERIES ================= */
const projectSectionQuery = `*[_type=="projectSection"][0]{
  heading,
  subheading,
  showSection,
  typography{
    fontFamily,
    fontSize,
    headingColor,
    textColor
  }
}`;

const projectsQuery = `*[_type=="project"]{
  _id,
  title,
  description,
  image,
  projectUrl
}`;

/* ================= COMPONENT ================= */
const Portfolio = () => {
  const [section, setSection] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    client.fetch(projectSectionQuery).then(setSection);
    client.fetch(projectsQuery).then(setProjects);
  }, []);

  if (!section?.showSection) return null;

  return (
    <section
      className="portfolio"
      id="projects"
      style={{
        fontFamily: section?.typography?.fontFamily,
        fontSize: section?.typography?.fontSize,
        color: section?.typography?.textColor,
      }}
    >
      {/* ================= SECTION HEADING ================= */}
      <h2
        className="portfolio-title"
        style={{ color: section?.typography?.headingColor }}
      >
        {section.heading?.split(" ")[0]}{" "}
        <span>{section.heading?.split(" ").slice(1).join(" ")}</span>
      </h2>

      {section.subheading && (
        <p
          className="portfolio-subtitle"
          style={{ color: section?.typography?.textColor }}
        >
          {section.subheading}
        </p>
      )}

      {/* ================= PROJECT GRID ================= */}
      <div className="portfolio-grid">
        {projects.map((project) => (
          <div className="portfolio-card" key={project._id}>
            {/* IMAGE + OVERLAY */}
            <div className="portfolio-image-wrapper">
              {project.image && (
                <>
                  <img
                    src={urlFor(project.image).width(600).url()}
                    alt={project.title}
                    className="portfolio-img"
                  />

                  {/* OVERLAY TITLE (OLD UI STYLE) */}
                  <div className="portfolio-overlay">
                    <h3>{project.title}</h3>
                  </div>
                </>
              )}
            </div>

            {/* OPTIONAL LINK */}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
