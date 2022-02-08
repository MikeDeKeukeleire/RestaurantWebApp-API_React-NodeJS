import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMenu } from "../contexts/MenuProvider";
import MenuCard from "../components/MenuCard";

export default function Kaart() {
  const { menu } = useMenu();

  localStorage.clear();

  return (
    <>
      <nav className="bg-gray-600 px-4">
        <Navbar />
      </nav>
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-semibold text-2xl py-4 text-white">
          Vind hier de menukaart:
        </p>
        <div className="text-center">
          {menu.map((menu) => (
            <MenuCard
              name={menu.name}
              price={menu.price}
              thumbnail={menu.thumbnail}
              id={menu.id}
              ingredients={menu.ingredients.ingredients}
              key={menu.id}
            ></MenuCard>
          ))}
        </div>
      </div>
      <footer className="bg-gray-600 text-white px-4">
        <Footer />
      </footer>
    </>
  );
}
