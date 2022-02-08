import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { useEvent } from "../contexts/EventProvider";

export default function Evenementen() {
  const { event } = useEvent();

  localStorage.clear();

  return (
    <>
      <nav className="bg-gray-600 px-4">
        <Navbar />
      </nav>
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-semibold text-2xl py-4 text-white">
          Vind hier de komende evenementen:
        </p>
        <div className="text-center">
          {event.map((event) => (
            <EventCard
              date={event.date}
              title={event.title}
              description={event.description}
              key={event.id}
            ></EventCard>
          ))}
        </div>
      </div>
      <footer className="bg-gray-600 text-white px-4">
        <Footer />
      </footer>
    </>
  );
}
