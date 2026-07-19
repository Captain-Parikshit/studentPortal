import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Portal</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Find your dream job with ease.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>
          <a href="/browse">Browse</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="#">
            <FaGithub />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="border-t py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;