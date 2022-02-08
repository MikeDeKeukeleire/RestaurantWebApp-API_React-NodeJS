import React from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import { useMenu } from "../contexts/MenuProvider";
import MenuCard from "../components/MenuCard";

export default function AuthHome() {
  const { menu } = useMenu();

  return (
    <>
      <nav className="bg-gray-600 px-4">
        <AuthNavbar />
      </nav>
      <div className="max-w-7xl mx-auto px-4">
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
        <AuthFooter />
      </footer>
    </>
  );
}
