// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full flex items-center justify-between px-6"
      style={{
        height: "40px",
        backgroundColor: "#191034",
      }}
    >
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="/b83c6f6a-f681-4c31-a9c8-bdc0e81796e2.png"
          alt="Audify Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Right: About text */}
      <div>
        <p className="text-white text-sm">About this page</p>
      </div>
    </footer>
  );
};

export default Footer;
