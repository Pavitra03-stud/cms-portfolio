import "../styles/Contact.css";
import { useEffect, useState } from "react";
import client from "../sanityClient";
import { PortableText } from "@portabletext/react";

const contactQuery = `*[_type=="contact"][0]{
  heading,
  description,
  email,
  phone,
  address,
  showSection
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

const Contact = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    client.fetch(contactQuery).then(setContact);
  }, []);

  if (!contact?.showSection) return null;

  return (
    <section className="contact" id="contact">
      <h2 className="contact-title">
        {contact.heading?.split(" ")[0]}{" "}
        <span>{contact.heading?.split(" ").slice(1).join(" ")}</span>
      </h2>

      <div className="contact-wrapper">
        <div className="contact-left">
          <PortableText
            value={contact.description}
            components={portableComponents}
          />

          {contact.email && (
            <p><strong>Email:</strong> {contact.email}</p>
          )}
          {contact.phone && (
            <p><strong>Phone:</strong> {contact.phone}</p>
          )}
          {contact.address && (
            <p><strong>Address:</strong> {contact.address}</p>
          )}
        </div>

        {/* OLD FORM – unchanged */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea rows="5" placeholder="Your Message"></textarea>

          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
