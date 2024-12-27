import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleDashboardMenu = () => {
    setIsDashboardOpen((prev) => !prev);
    if (!isDashboardOpen) setIsProfileOpen(false); // Close Profile Menu
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev);
    if (!isProfileOpen) setIsDashboardOpen(false); // Close Dashboard Menu
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 w-full fixed top-0 left-0 z-50 bg-[#3877c5]">
      <div className="max-w-screen-xl mx-auto px-3 h-full flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          University Management
        </h2>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-6 uppercase text-xs lg:text-sm font-medium text-white">
          <Link to="/" className="hover:text-orange-400 duration-200">
            Home
          </Link>
          <Link to="/login" className="hover:text-orange-400 duration-200">
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-20 left-0 w-full h-screen bg-[#3877c5] flex flex-col items-center justify-center z-20"
          >
            <Link
              to="/"
              className="text-white py-4 text-lg"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-white py-4 text-lg"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            {isProfileOpen && (
              <div className="fixed lg:absolute right-0 mt-5 lg:mt-2 w-screen lg:w-80 bg-white rounded-lg shadow-lg p-4 z-10">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-semibold text-xl">Profile Menu</span>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="btn btn-accent"
                    aria-label="Close Profile Menu"
                  >
                    X
                  </button>
                </div>
                <ul className="mt-3">
                  <li className="py-2 hover:bg-gray-100 rounded-md">
                    <a href="#">Profile</a>
                  </li>
                  <li className="py-2 hover:bg-gray-100 rounded-md">
                    <a href="#">Settings</a>
                  </li>
                  <li className="py-2 hover:bg-gray-100 rounded-md">
                    <a href="#">Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Dashboard Menu */}
          <div className="relative">
            <button
              onClick={toggleDashboardMenu}
              className="btn btn-ghost text-white"
            >
              Dashboard
            </button>
            {isDashboardOpen && (
              <div className="fixed lg:absolute right-0 mt-5 lg:mt-2 w-screen lg:w-80 bg-white rounded-lg shadow-lg p-4 z-10">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-semibold text-xl">Dashboard Menu</span>
                  <button
                    onClick={() => setIsDashboardOpen(false)}
                    className=" text-2xl btn btn-secondary"
                    aria-label="Close Dashboard Menu"
                  >
                    X
                  </button>
                </div>
                <ul className="mt-3">
                  <li className="py-2 hover:bg-gray-100 rounded-md">
                    <a href="#">Overview</a>
                  </li>
                  <li className="py-2 hover:bg-gray-100 rounded-md">
                    <a href="#">Analytics</a>
                  </li>
                  <li className="py-2 hover:bg-gray-100 rounded-md">
                    <a href="#">Reports</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
