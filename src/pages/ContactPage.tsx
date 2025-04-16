import React from "react";
import Navbar from "../components/layout/Navbar";
import ContactHero from "../components/contact/ContactHero";
import ContactFAQ from "../components/contact/ContactFAQ";
import ContactForm from "../components/contact/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <ContactHero />
      <ContactFAQ />
      <ContactForm />
    </div>
  );
};

export default ContactPage; 