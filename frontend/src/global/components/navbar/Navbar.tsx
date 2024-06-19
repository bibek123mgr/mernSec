import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const menu = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact" },
  ];

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow((prev) => !prev);

  const handleLogOut = () => {
    onLogout();
  };
  return (
    <nav className="bg-gray-100 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold dark:text-white">Logo</h1>
        </a>
        <button className="md:hidden p-2" onClick={handleToggle}>
          <IoIosMenu size={30} />
        </button>
        <div
          id="navbar"
          className={`${
            show ? "max-h-screen" : "max-h-0"
          } overflow-hidden transition-max-height duration-500 ease-in-out w-full md:flex md:w-auto md:relative md:max-h-none md:overflow-visible md:bg-transparent`}
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 text-sm font-medium md:items-center">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block md:p-2 py-2 text-gray-700 dark:text-white"
                  >
                    <span className="text-lg">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <div className="flex gap-4">
                <Link to="/profile">
                  <i className="fa-regular fa-user text-xl"></i>
                </Link>
                <Link to="/cart">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
                </Link>
              </div>
            )}
            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/signin"
                    className="bg-blue-700 p-2 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign In
                  </Link>
                  <Link to="/signup" className="p-2">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button className="p-2" onClick={handleLogOut}>
                  Log Out{" "}
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
