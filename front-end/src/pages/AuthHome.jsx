import React from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";

export default function AuthHome() {
  return (
    <>
      <nav className="bg-gray-600 px-4">
        <AuthNavbar />
      </nav>
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-semibold text-2xl text-white py-4">
          Welkom Katrien!
        </p>
        <p className="font-semibold text-xl text-white py-4">
          In deze web applicatie kan jij de menu's en evenementen van Den Tyto
          beheren.
        </p>
      </div>
      <footer className="fixed inset-x-0 bottom-0 bg-gray-600 text-white px-4">
        <AuthFooter />
      </footer>
    </>
  );
}
