import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_black.png";
import { useLogout } from "../contexts/AuthProvider";

export default function AuthNavbar() {
  const logout = useLogout();
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <nav className="py-2">
      <Link to="/authhome">
        <img src={Logo} alt="Logo van Den Tyto" className="mx-auto" />
      </Link>
      <ul className="flex max-w-7xl mx-auto justify-around">
        <li className="flex-1 mr-2">
          <Link to="/authhome">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Home
            </p>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          {" "}
          <Link to="/authkaart">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Kaart
            </p>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link to="/authevents">
            <p className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold">
              Evenementen
            </p>
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link to="/">
            <p
              onClick={handleLogout}
              className="text-center block border border-orange-600 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white font-semibold"
            >
              Uitloggen
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
