"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { toast } from "sonner";
import type { FormValues } from "@/types";

export default function RegisterUser() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const UserObj = Object.fromEntries(formData.entries()) as FormValues;

    setLoading(true);

    const imageFile = formData.get("imageFile") as File | null;
    let imageUrl: string | undefined;

    const uploadToImgBB = async (file: File) => {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) throw new Error("Missing imgbb API key");

      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      if (!json?.success) {
        throw new Error(json?.error?.message || "Image upload failed");
      }
      return json.data.url as string;
    };

    try {
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadToImgBB(imageFile);
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.");
      setLoading(false);
      return;
    }

    // Register with BetterAuth
    const signUpPayload = {
      email: UserObj.email,
      password: UserObj.password,
      name: UserObj.name,
      image: imageUrl,           // ← imgBB uploaded URL sent to database
      user: { userType: "user" },
      callbackURL: "/",
    } as any;

    await authClient.signUp.email(signUpPayload, {
      onSuccess: () => {
        toast.success("Welcome aboard! Redirecting...");
        router.push("/");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Registration failed.");
        setLoading(false);
      },
    });
  };

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({ provider: "google" });
    } catch (err) {
      console.error(err);
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 p-4">
      <div className="w-full max-w-md">
        <Surface className="rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-zinc-800">
          <Form onSubmit={onSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                ThinkShare
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Create your account
              </p>
            </div>

            <Fieldset className="space-y-6">
              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input
                  placeholder="John Doe"
                  variant="secondary"
                />
                <FieldError />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input
                  placeholder="john@example.com"
                  variant="secondary"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                validate={(value: string) => {
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
                  if (!/[0-9]/.test(value)) return "Must contain at least one number";
                  return null;
                }}
              >
                <Label>Password</Label>
                <Input
                  placeholder="Enter your password"
                  variant="secondary"
                />
                <Description className="text-sm text-gray-500">
                  Minimum 8 characters with uppercase and number
                </Description>
                <FieldError />
              </TextField>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="label">
                  <span className="label-text text-sm font-medium">Profile Photo (optional)</span>
                </label>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="file-input file-input-bordered w-full rounded-xl"
                />
                <p className="text-xs text-gray-500">
                  Will be uploaded to ImgBB and saved in your profile
                </p>
              </div>
            </Fieldset>

            <Fieldset.Actions className="flex flex-col gap-3 pt-4">
              <Button
                type="submit"
                isDisabled={isLoading}
                className="w-full rounded-2xl py-6 text-base font-semibold"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <Button
                type="reset"
                variant="tertiary"
                className="w-full rounded-2xl"
              >
                Reset
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-zinc-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-surface px-4 text-gray-500">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="btn btn-outline w-full rounded-2xl py-6 flex items-center justify-center gap-3 text-base"
                disabled={isLoading}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </Fieldset.Actions>
          </Form>
        </Surface>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}