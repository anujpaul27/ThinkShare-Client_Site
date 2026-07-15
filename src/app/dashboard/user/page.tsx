"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session && session.data) {
          setUserName(session.data.user?.name || "User");
          setUserRole((session.data.user as any)?.role || "user");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getSession();
  }, []);

  const role = pathname.includes("/admin") ? "admin" : "user";

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className="text-blue-100 text-lg">
          {role === "admin"
            ? "You are viewing the Admin Dashboard"
            : "You are viewing your Personal Dashboard"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="My Ideas" value="0" icon="💡" />
        <StatsCard title="My Interactions" value="0" icon="💬" />
        <StatsCard title="Profile Complete" value="0%" icon="👤" />
        {role === "admin" && (
          <>
            <StatsCard title="Total Users" value="0" icon="👥" />
            <StatsCard title="Total Ideas" value="0" icon="🌟" />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionButton
            label="Add New Idea"
            href={`/dashboard/${role}/add-idea`}
            color="blue"
          />
          <QuickActionButton
            label="View My Ideas"
            href={`/dashboard/${role}/my-ideas`}
            color="green"
          />
          <QuickActionButton
            label="View Interactions"
            href={`/dashboard/${role}/my-interactions`}
            color="purple"
          />
          {role === "admin" && (
            <>
              <QuickActionButton
                label="Manage All Ideas"
                href={`/dashboard/${role}/all-ideas`}
                color="orange"
              />
              <QuickActionButton
                label="Manage Users"
                href={`/dashboard/${role}/all-users`}
                color="red"
              />
            </>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Dashboard Info
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {role === "admin"
            ? "Welcome to the Admin Dashboard! Here you can manage all users, ideas, and interactions on the platform. Use the sidebar to navigate through different sections."
            : "Welcome to your Personal Dashboard! Here you can manage your ideas, track interactions, and update your profile. Start by adding a new idea or exploring existing ones."}
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
  color: "blue" | "green" | "purple" | "orange" | "red";
}

function QuickActionButton({ label, href, color }: QuickActionButtonProps) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    red: "bg-red-500 hover:bg-red-600",
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
