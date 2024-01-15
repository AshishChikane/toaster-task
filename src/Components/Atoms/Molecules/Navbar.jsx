import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Dream International</div>
      <div className="flex">
        <Link
          to="/"
          className={`mx-2 ${location.pathname === "/" ? "font-bold" : ""}`}
        >
          Component One
        </Link>
        <Link
          to="/second"
          className={`mx-2 ${
            location.pathname === "/second" ? "font-bold" : ""
          }`}
        >
          Component Two
        </Link>
        <Link
          to="/three"
          className={`mx-2 ${
            location.pathname === "/three" ? "font-bold" : ""
          }`}
        >
          Component Three
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
