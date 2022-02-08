import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  localStorage.clear();
  return (
    <>
      <nav className="bg-gray-600 px-4">
        <Navbar />
      </nav>
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-semibold text-2xl text-white py-4">
          Neem hier contact met ons op:
        </p>
        <ContactForm />
      </div>
      <footer className="fixed inset-x-0 bottom-0 bg-gray-600 text-white px-4">
        <Footer />
      </footer>
    </>
  );
}
