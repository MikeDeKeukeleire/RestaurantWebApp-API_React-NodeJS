import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto py-2 grid grid-cols-2">
      <div className="justify-self-start py-2">
        &copy; Mike De Keukeleire, all rights reserved
      </div>
      <div className="justify-self-end">
        <Link to="/login">
          <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
            Inloggen
          </p>
        </Link>
      </div>
    </footer>
  );
}
