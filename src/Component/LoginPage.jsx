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
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const { email, password } = Object.fromEntries(formData.entries());

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
            
            // Production এ double navigation + refresh 
            router.push(callbackUrl);
            router.refresh();           
          },

          onError: (ctx) => {
            toast.error(ctx.error?.message || "Invalid email or password.");
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center text-center items-center bg-background p-4">
      <div className="w-full max-w-md">
        <Surface className="p-8 rounded-3xl">
          <Form onSubmit={onSubmit}>
            <Fieldset>
              <Fieldset.Legend className="text-3xl mb-2">
                Login to ThinkShare
              </Fieldset.Legend>

              <Description className="text-lg mb-6">
                Login and share your ideas with us
              </Description>

              <Fieldset.Group className="flex flex-col  ">

                <TextField  isRequired name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" variant="secondary" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) return "Password must be at least 8 characters";
                    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                    return null;
                  }}
                >
                  <Label>Password</Label>
                  <Input placeholder="Enter your password" variant="secondary" />
                  <Description>
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </Description>
                  <FieldError />
                </TextField>

                <p className="text-sm text-center">
                  Don’t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </p>
              </Fieldset.Group>

              <Fieldset.Actions className="mt-6 flex flex-col gap-3">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="rounded-full w-full"
                >
                  {isLoading ? "Signing in..." : "Login"}
                </Button>

                <Button type="button" variant="tertiary" className="w-full">
                  Continue with Google
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}