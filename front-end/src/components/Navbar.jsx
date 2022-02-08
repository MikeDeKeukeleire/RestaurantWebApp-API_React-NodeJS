import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_black.png";

export default function Navbar() {
  return (
    <nav className="py-2">
      <Link to="/">
        <img src={Logo} alt="Logo van Den Tyto" className="mx-auto" />
      </Link>
      <ul className="flex max-w-7xl mx-auto justify-around">
        <li className="flex-1 mr-2">
          <Link to="/">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Home
            </p>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          {" "}
          <Link to="/kaart">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Kaart
            </p>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link to="/evenementen">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Evenementen
            </p>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link to="/contact">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Contact
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
