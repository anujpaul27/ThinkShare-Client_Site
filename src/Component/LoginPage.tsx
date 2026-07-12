"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, type FormEvent } from "react";
import { toast } from "sonner";
import type { FormValues } from "@/types";

export default function LoginPage() {
  const [isLoading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Password Validation Function
  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return "";
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()) as FormValues;

    // Validate Password
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      toast.error(error);
      return;
    }

    setPasswordError("");
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }

      await authClient.signIn.email(
        {
          email: email,
          password: password,
          callbackURL: callbackUrl,
        },
        {
          onSuccess: () => {
            toast.success("Welcome aboard! Redirecting...");
            router.push(callbackUrl);
            router.refresh();
          },

          onError: (ctx) => {
            toast.error(ctx.error?.message || "Invalid email or password.");
          },
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h2 className="text-3xl font-bold text-center mb-2">Login to ThinkShare</h2>
            <p className="text-base-content/70 text-center mb-8">
              Login and share your ideas with us
            </p>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Password Field with Validation */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`input input-bordered w-full ${passwordError ? 'input-error' : ''}`}
                  required
                  onChange={(e) => {
                    if (passwordError) setPasswordError(""); // Clear error while typing
                  }}
                />
                
                {passwordError && (
                  <label className="label">
                    <span className="label-text-alt text-error">{passwordError}</span>
                  </label>
                )}
                
                <label className="label">
                  <span className="label-text-alt text-base-content/70">
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </span>
                </label>
              </div>

              {/* Register Link */}
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Register here
                </Link>
              </p>

              {/* Buttons */}
              <div className="space-y-3 mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full text-lg"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Login"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSignInWithGoogle}
                  className="btn btn-outline w-full"
                >
                  Continue with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
