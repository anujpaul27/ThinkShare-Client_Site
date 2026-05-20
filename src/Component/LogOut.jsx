"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
    setIsPending(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="btn btn-error btn-sm md:btn-md px-6 rounded-lg font-medium"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;