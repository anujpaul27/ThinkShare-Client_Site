'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import DashboardLayout from "@/Component/Dashboard/DashboardLayout";
import { Loader } from "lucide-react";

type UserRole = "user" | "admin";

interface SessionUser {
  userType?: {
    role?: string;
  };
  // Add other possible user properties if needed
}

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        console.log(session);
        if (!session.data) {
          router.push("/login");
          return;
        }

        // Handle different possible session structures
        const sessionAny = session as any;
        const user = sessionAny?.data?.user ?? sessionAny?.user ?? null;
        const role = user?.userType;
        setUserRole(role)
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Loading State
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

  // If no valid role (should rarely happen)
  if (!userRole) {
    router.push("/login");
    return null;
  }

  return (
    <DashboardLayout userRole={userRole}>
      {children}
    </DashboardLayout>
  );
}