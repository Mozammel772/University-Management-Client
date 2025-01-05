import React from "react";
import { Outlet } from "react-router-dom"; // Ensure the correct import path
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Pages/Shared/Footer";
import Navbar from "../../Pages/Shared/Navbar";

const Mainlayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <header>
        <Navbar />
      </header>

      {/* Main content positioned between Navbar and Footer */}
      <main className="flex-grow mt-5">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <footer>
        <Footer />
      </footer>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Mainlayout;
