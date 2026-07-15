"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DashboardSidebarProps {
  userRole: "user" | "admin";
}

export default function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const isActive = (href: string) => pathname === href;

  const navigationItems = [
    {
      label: "Dashboard",
      href: `/dashboard/${userRole}`,
      icon: LayoutDashboard,
    },
    {
      label: "Add Idea",
      href: `/dashboard/${userRole}/add-idea`,
      icon: PlusCircle,
    },
    {
      label: "My Ideas",
      href: `/dashboard/${userRole}/my-ideas`,
      icon: BookOpen,
    },
    {
      label: "My Interactions",
      href: `/dashboard/${userRole}/my-interactions`,
      icon: MessageSquare,
    },
    {
      label: "Profile",
      href: `/dashboard/${userRole}/profile`,
      icon: User,
    },
    ...(userRole === "admin"
      ? [
          {
            label: "All Ideas",
            href: `/dashboard/${userRole}/all-ideas`,
            icon: BookOpen,
          },
          {
            label: "All Users",
            href: `/dashboard/${userRole}/all-users`,
            icon: User,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-950 text-white shadow-lg transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-700 dark:border-gray-800">
          <h1 className="text-2xl font-bold">
            {userRole === "admin" ? "Admin" : "User"} Dashboard
          </h1>
          <p className="text-sm text-gray-300 dark:text-gray-400 mt-1">
            {userRole === "admin" ? "Administration Panel" : "Your Workspace"}
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? "bg-blue-600 dark:bg-blue-700 text-white font-semibold shadow-md"
                        : "text-gray-200 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 rounded-lg transition font-semibold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black dark:bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
