"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToDashboard = async () => {
      try {
        const sessionResponse = await authClient.getSession() as {
          data?: { session?: { user?: { role?: string } } };
          error?: unknown;
        };

        if ("error" in sessionResponse || !sessionResponse.data?.session) {
          router.push("/login");
          return;
        }

        // Determine role - TODO: Get from backend/session
        const role = (sessionResponse.data.session.user as any)?.role || "user";
        router.push(`/dashboard/${role}`);
      } catch (error) {
        console.error("Error redirecting:", error);
        router.push("/login");
      }
    };

    redirectToDashboard();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <Loader className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
        <p className="text-gray-600 font-semibold">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
}
