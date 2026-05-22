"use client";

import React from "react";
import Link from "next/link";
import { Lightbulb, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-300  text-base-content border-t border-base-200">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">ThinkShare</span>
            </div>
            <p className="text-base-content/70 text-sm leading-relaxed max-w-xs">
              A community platform where innovative startup ideas are shared,
              validated, and turned into reality.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ideas" className="hover:text-primary transition">
                  Browse Ideas
                </Link>
              </li>
              <li>
                <Link
                  href="/my-ideas"
                  className="hover:text-primary transition"
                >
                  My Ideas
                </Link>
              </li>
              <li>
                <Link
                  href="/my-interactions"
                  className="hover:text-primary transition"
                >
                  Interactions
                </Link>
              </li>
              <li>
                <Link
                  href="/add-idea"
                  className="hover:text-primary transition"
                >
                  Share Idea
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>

            <div className="flex items-center gap-2 mb-4">
              <a
                href="mailto:hello@ideavault.com"
                className="text-sm hover:text-primary transition"
              >
                hello@ideavault.com
              </a>
            </div>

            <div className="mb-6">
              <p className="text-sm text-base-content/70">Sylhet, Bangladesh</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="/facebook.com"
                className="btn btn-ghost btn-circle hover:text-blue-600"
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-circle hover:text-blue-700"
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-circle hover:text-gray-800 dark:hover:text-white"
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-circle hover:text-blue-600"
              >
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-200 dark:border-neutral-700 lg:mt-12 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-base-content/60">
            © {new Date().getFullYear()} ThinkShare. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-base-content/60">
            <Link
              href="/privacy"
              className="hover:text-base-content transition"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-base-content transition">
              Terms of Service
            </Link>
          </div>

          <p className="text-base-content/50 text-xs">
            Made with ❤️ for Innovators
          </p>
        </div>
      </div>
    </footer>
  );
}
