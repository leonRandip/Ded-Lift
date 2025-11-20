"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import ColorPalettePicker from "./ColorPalettePicker";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu - Desktop only */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="hidden md:flex fixed top-6 left-6 z-50 w-12 h-12 liquid-glass-card rounded-full items-center justify-center hover:bg-white/30 transition-all duration-300"
      >
        <svg
          className="w-6 h-6 text-[var(--color-9)]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Compact Floating Navbar */}
      <nav className="fixed top-5 left-6 md:left-1/2 md:-translate-x-1/2 z-40 liquid-glass-card rounded-full px-6 py-2 md:px-6 md:py-0 shadow-xl overflow-visible">
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="DedLift Logo"
              width={65}
              height={65}
              className="object-contain w-16 h-14 md:w-12 md:h-12 md:w-[65px] md:h-[65px]"
            />
          </div>

          {/* Navigation Links - Compact */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/"
              className="text-[var(--color-10)] hover:text-[var(--color-9)] font-medium transition-colors duration-300 text-sm"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-[var(--color-9)] hover:text-[var(--color-10)] font-medium transition-colors duration-300 text-sm"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-[var(--color-9)] hover:text-[var(--color-10)] font-medium transition-colors duration-300 text-sm"
            >
              Pricing
            </Link>
          </div>
        </div>
      </nav>

      {/* Color Palette Picker */}
      <ColorPalettePicker />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
