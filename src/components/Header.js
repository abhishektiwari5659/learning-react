import { useState } from "react";
import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";
import { useSelector } from "react-redux";

export const Header = () => {
  const onlineStatus = useStatus();
  const [btn, setBtn] = useState("login");
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              className="h-10 w-auto"
              src="https://img.freepik.com/free-vector/restaurant-tasty-food-logo-design_460848-10307.jpg"
              alt="logo"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-end items-center">
          <ul className="flex space-x-6 items-center">
            <li className="text-gray-700">
              {onlineStatus ? "Online ✅" : "Offline 🔴"}
            </li>
            <li>
              <Link className="text-gray-700 hover:text-orange-500 transition" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-orange-500 transition" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-orange-500 transition" to="/cart">
                Cart ({cartItems.length})
              </Link>
            </li>
            <li>
              <Link className="text-gray-700 hover:text-orange-500 transition" to="/about">
                About
              </Link>
            </li>
            <li>
              <button
                onClick={() => setBtn(btn === "login" ? "logout" : "login")}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              >
                {btn}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center space-y-1 p-2 rounded focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col space-y-3 px-4">
          <li className="text-gray-700">{onlineStatus ? "Online ✅" : "Offline 🔴"}</li>
          <li>
            <Link onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 transition" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 transition" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 transition" to="/cart">
              Cart ({cartItems.length})
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-orange-500 transition" to="/about">
              About
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setBtn(btn === "login" ? "logout" : "login");
                setMenuOpen(false);
              }}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              {btn}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
