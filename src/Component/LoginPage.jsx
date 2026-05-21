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

  // user router for the redirect
  const router = useRouter();
  
  //Accept params from proxy and redirect desire route 
  const searchParams = useSearchParams();
  const navigateTo = searchParams.get("callbackUrl") || "/";
  console.log(navigateTo)
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const UserObj = Object.fromEntries(formData.entries());

    // loading true when form submit
    setLoading(true);

    // User Register with BetterAuth
    const { data, error } = await authClient.signIn.email(
      {
        email: UserObj.email,
        password: UserObj.password,
      },
      {
        onSuccess: (ctx) => {
          toast.success("Welcome aboard! Redirecting...");
          router.push(navigateTo);
        },
        onError: (ctx) => {
          // display the error message
          toast.error(ctx.error.message || "Sign up failed.");
          setLoading(false);
        },
      },
    );
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
