"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardLayout from "@/Component/Dashboard/DashboardLayout";
import { Loader } from "lucide-react";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        // Get user role from session or set default to "user"
        // TODO: Implement role retrieval from backend/session
        const role = (session.user as any)?.role || "user";
        setUserRole(role as "user" | "admin");
        setLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userRole) {
    return null;
  }

  return (
    <DashboardLayout userRole={userRole}>
      {children}
    </DashboardLayout>
  );
}
