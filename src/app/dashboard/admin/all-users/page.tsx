"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  status?: "active" | "unactive";
}

export default function AdminAllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoUsers: User[] = [
      {
        id: "1",
        name: "Rahul Kumar",
        email: "rahul.kumar@example.com",
        createdAt: "2024-01-15",
        status: "unactive",
      },
      {
        id: "2",
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        createdAt: "2024-02-20",
      },
      {
        id: "3",
        name: "Amit Patel",
        email: "amit.patel@example.com",
        createdAt: "2024-03-10",
      },
      {
        id: "4",
        name: "Neha Gupta",
        email: "neha.gupta@example.com",
        createdAt: "2024-04-05",
      },
      {
        id: "5",
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        createdAt: "2024-05-12",
      },
      {
        id: "6",
        name: "Anjali Verma",
        email: "anjali.verma@example.com",
        createdAt: "2024-06-18",
        status: "unactive",
      },
    ];

    setUsers(demoUsers);
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleUserStatus = async (
    id: string,
    current: "active" | "unactive" | undefined,
  ) => {
    const newStatus = current === "active" ? "unactive" : "active";

    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
    );

    try {
      await fetch(`/api/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error(err);
      // rollback on error
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: current || "unactive" } : u,
        ),
      );
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">All Users</h1>
        <p className="text-red-100">Manage all users on the platform</p>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1  gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition overflow-hidden p-6"
            >
              {/* Avatar */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Info */}
              <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-2">
                {user.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 break-all">
                {user.email}
              </p>

              {/* Joined Date */}
              <div className="text-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Joined:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <span
                    className={`inline-block w-full text-center py-2 px-3 rounded-lg text-sm font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.status ?? "unactive"}
                  </span>
                </div>
                <Link href={`/profile/${user.id}`} className="flex-1">
                  <button className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm">
                    <Eye size={16} />
                    View
                  </button>
                </Link>
                <button
                  className="flex-1 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <button
                  className={`flex-1 ${
                    user.status === "active"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm`}
                  onClick={() => toggleUserStatus(user.id, user.status)}
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No users found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
