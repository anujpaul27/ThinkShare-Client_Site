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
                  href="/categories"
                  className="hover:text-primary transition"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-primary transition"
                >
                  Trending
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
                href="#"
                className="btn btn-ghost btn-circle hover:text-blue-600"
              >               
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-circle hover:text-blue-700"
              >
               
              </a>
              <a
                href="#"
                className="btn btn-ghost btn-circle hover:text-gray-800 dark:hover:text-white"
              >
               
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
