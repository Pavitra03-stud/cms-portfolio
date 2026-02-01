import "../styles/Services.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";

const servicesQuery = `*[_type=="services"][0]{
  heading,
  highlightWord,
  showSection,
  servicesList[]{
    serviceTitle,
    serviceDescription
  }
}`;

const portableComponents = {
  marks: {
    textColor: ({ value, children }) => {
      const colors = {
        accent: "var(--accent-color)",
        blue: "#60a5fa",
        pink: "#ff7ab6",
        white: "#ffffff",
      };
      return <span style={{ color: colors[value.color] }}>{children}</span>;
    },
  },
};

const Services = () => {
  const [services, setServices] = useState(null);

  useEffect(() => {
    client.fetch(servicesQuery).then(setServices);
  }, []);

  if (!services?.showSection) return null;

  return (
    <section className="services" id="services">
      <h2 className="services-title">
        {services.heading?.replace(services.highlightWord, "")}
        <span>{services.highlightWord}</span>
      </h2>

      <div className="services-grid">
        {services.servicesList?.map((item, index) => (
          <div className="service-card" key={index}>
            <span className="service-id">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3>{item.serviceTitle}</h3>

            <PortableText
              value={item.serviceDescription}
              components={portableComponents}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
