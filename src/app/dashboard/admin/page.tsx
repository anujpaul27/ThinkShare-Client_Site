"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AdminDashboardPage() {
  const [userName, setUserName] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session) {
          setUserName(session.user?.name || "Admin");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getSession();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className="text-red-100 text-lg">
          You are viewing the Admin Dashboard
        </p>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value="0" icon="👥" />
        <StatsCard title="Total Ideas" value="0" icon="🌟" />
        <StatsCard title="Total Interactions" value="0" icon="💬" />
        <StatsCard title="Platform Status" value="Active" icon="✓" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Admin Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionButton
            label="Manage All Ideas"
            href="/dashboard/admin/all-ideas"
            color="orange"
          />
          <QuickActionButton
            label="Manage Users"
            href="/dashboard/admin/all-users"
            color="red"
          />
          <QuickActionButton
            label="My Ideas"
            href="/dashboard/admin/my-ideas"
            color="green"
          />
          <QuickActionButton
            label="My Interactions"
            href="/dashboard/admin/my-interactions"
            color="purple"
          />
          <QuickActionButton
            label="Add New Idea"
            href="/dashboard/admin/add-idea"
            color="blue"
          />
          <QuickActionButton
            label="View Profile"
            href="/dashboard/admin/profile"
            color="indigo"
          />
        </div>
      </div>

      {/* Admin Info Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Admin Panel
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Welcome to the Admin Dashboard! Here you have complete control over
          the platform. You can manage all users, review all ideas, monitor
          interactions, and maintain the overall health of the community. Use
          the sidebar to navigate through different sections.
        </p>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  label: string;
  href: string;
  color: "blue" | "green" | "purple" | "orange" | "red" | "indigo";
}

function QuickActionButton({ label, href, color }: QuickActionButtonProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    red: "bg-red-500 hover:bg-red-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
  };

  return (
    <a
      href={href}
      className={`${colorClasses[color]} text-white font-semibold py-3 px-6 rounded-lg transition text-center block`}
    >
      {label}
    </a>
  );
}
