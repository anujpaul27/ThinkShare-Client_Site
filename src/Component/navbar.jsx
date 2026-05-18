"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes"; // Optional: if using next-themes
import {
  Home,
  Lightbulb,
  PlusCircle,
  FolderOpen,
  MessageSquare,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your auth logic (e.g., useSession)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme(); // If using next-themes

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="navbar bg-base-100 shadow-md border-b border-base-200 sticky top-0 z-50 ;">
      <div className="navbar-start">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-4">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary-content" />
          </div>
          <span className="text-2xl font-bold text-primary">IdeaVault</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href="/" className="flex items-center gap-1.5">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/ideas" className="flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              Ideas
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2 pr-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {isLoggedIn ? (
          <>
            {/* Private Links - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/add-idea" className="btn btn-primary btn-sm gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Idea
              </Link>

              <Link href="/my-ideas" className="btn btn-ghost btn-sm">
                My Ideas
              </Link>

              <Link href="/my-interactions" className="btn btn-ghost btn-sm">
                Interactions
              </Link>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full bg-base-300 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/my-ideas">My Ideas</Link>
                </li>
                <li>
                  <Link href="/my-interactions">My Interactions</Link>
                </li>
                <li>
                  <a onClick={() => setIsLoggedIn(false)}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          /* Auth Buttons */
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-xl border-t border-base-200 z-50">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" /> Home
            </Link>
            <Link
              href="/ideas"
              className="flex items-center gap-3 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lightbulb className="w-5 h-5" /> Ideas
            </Link>

            {isLoggedIn && (
              <>
                <div className="h-px bg-base-200 my-2" />

                <Link
                  href="/add-idea"
                  className="flex items-center gap-3 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PlusCircle className="w-5 h-5" /> Add Idea
                </Link>

                <Link
                  href="/my-ideas"
                  className="flex items-center gap-3 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FolderOpen className="w-5 h-5" /> My Ideas
                </Link>

                <Link
                  href="/my-interactions"
                  className="flex items-center gap-3 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare className="w-5 h-5" /> My Interactions
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" /> Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
