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
  // use state for dynamic submit button
  const [isLoading, setLoading] = useState(false);

  // use router for redirect
  const router = useRouter();

  // Accept params from proxy and redirect desired route
  const searchParams = useSearchParams();
  const navigateTo = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    // prevent multiple submit
    if (isLoading) return;

    try {
      // loading start
      setLoading(true);

      // get form data
      const formData = new FormData(e.currentTarget);
      const UserObj = Object.fromEntries(formData.entries());

      // validation
      if (!UserObj.email || !UserObj.password) {
        toast.error("Email and password are required.");
        return;
      }

      // BetterAuth Login
      await authClient.signIn.email(
        {
          email: UserObj.email,
          password: UserObj.password,
        },
        {
          onSuccess: () => {
            toast.success("Welcome aboard! Redirecting...");
            router.push(navigateTo);
          },

          onError: (ctx) => {
            toast.error(ctx.error.message || "Login failed.");
          },
        }
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      // loading stop
      setLoading(false);
    }
  };

  return (
    <div className="lg:w-full 10/12  h-screen  flex justify-center lg:items-center  ">
      <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
        <Surface className="w-full min-w-[380px]">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full mx-auto">
              <Fieldset.Legend className=" text-3xl  ">
                Login to ThinkShare
              </Fieldset.Legend>

              <Description className="text-xl  my-2 ">
                {" "}
                Login and share your idea with us{" "}
              </Description>
              <Fieldset.Group>
                <TextField isRequired name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" variant="secondary" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                      return "Password must contain at least one uppercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                      return "Password must contain at least one number";
                    }
                    return null;
                  }}
                >
                  <Label>Password</Label>
                  <Input
                    placeholder="Enter your password"
                    variant="secondary"
                  />
                  <Description>
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </Description>
                  <FieldError />
                </TextField>
                <p className="text-sm">Don’t have an account? <Link className='text-primary link' href={'/register'}>Register here</Link> </p>
              </Fieldset.Group>

              <Fieldset.Actions>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="rounded-full"
                >
                  {isLoading ? "Loading.." : "Login User"}
                </Button>

                <Button type="link" variant="tertiary">
                  Login with Google
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
