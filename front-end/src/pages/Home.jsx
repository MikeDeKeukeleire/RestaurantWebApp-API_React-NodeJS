import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import homeImg from "../images/homeimg.jpg";

export default function Home() {
  localStorage.clear();
  return (
    <>
      <nav className="bg-gray-600 px-4">
        <Navbar />
      </nav>
      <div className="max-w-7xl mx-auto sm:grid sm:grid-cols-2 text-white px-4">
        <div>
          <p className="font-semibold text-2xl py-4">Welkom bij Den Tyto!</p>
          <img
            src={homeImg}
            alt="Bar van Den Tyto"
            className="w-9/12 h-9/12 mt-5 mb-5"
          />
        </div>
        <aside>
          <p className="font-semibold text-2xl py-4">Openingsuren:</p>
          <p>
            Maandag: Gesloten!
            <br />
            Dinsdag: 17u-23u
            <br />
            Woensdag: 17u-23u
            <br />
            Donderdag: 17u-23u
            <br />
            Vrijdag: 17u-...
            <br />
            Zaterdag: 17u-...
            <br />
            Zondag: 17u-...
          </p>
          <p className="font-semibold text-2xl mt-2">Locatie:</p>
          <p>
            Urseldorp 3,
            <br />
            9910 Knesselare <br />
            <iframe
              className="mt-2"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d625.9608884155605!2d3.485200429253399!3d51.12979369872343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c367d85720bccf%3A0xa0d222f13e4d65e0!2s&#39;T%20Dorp!5e0!3m2!1sen!2sbe!4v1636457931980!5m2!1sen!2sbe"
              width="250"
              height="250"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </p>
        </aside>
      </div>
      <footer className="bg-gray-600 text-white px-4">
        <Footer />
      </footer>
    </>
  );
}
