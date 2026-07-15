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
import React, { useState,FormEvent  } from "react";
import { toast } from "sonner";
import type { FormValues } from "@/types";

export default function RegisterUser() {
  // use state for dynamic submit button
  const [isLoading, setLoading] = useState<boolean>(false);

  // user router for the redirect
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const UserObj = Object.fromEntries(formData.entries()) as FormValues;

    // loading true when form submit
    setLoading(true);

    // User Register with BetterAuth
    const { data, error } = await authClient.signUp.email(
      {
        email: UserObj.email,
        password: UserObj.password,
        name: UserObj.name,
        image: UserObj.ImageURL,
        callbackURL: "/",
      },
      {
        onSuccess: (ctx) => {
          toast.success("Welcome aboard! Redirecting...");
          router.push("/");
        },
        onError: (ctx) => {
          // display the error message
          toast.error(ctx.error.message || "Register failed.");
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="lg:w-full   h-screen  flex justify-center lg:items-center  ">
      <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
        <Surface className="w-full min-w-[380px]">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full ">
              <Fieldset.Legend className=" text-3xl  ">
                ThinkShare Register
              </Fieldset.Legend>
              <Description className="text-xl  my-2 ">
                {" "}
                Register is the first ThinkShare{" "}
              </Description>
              <Fieldset.Group>
                <TextField
                  isRequired
                  name="name"
                  validate={(value: string) => {
                    if (value.length < 3) {
                      return "Name must be at least 3 characters";
                    }

                    return null;
                  }}
                >
                  <Label>Name</Label>
                  <Input placeholder="John Doe" variant="secondary" />
                  <FieldError />
                </TextField>

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
                  validate={(value: string) => {
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

                <TextField isRequired name="ImageURL" type="text">
                  <Label>Photo URL (chose URL from unsplash free image link)</Label>
                  <Input placeholder="https://image.unsplash.com/avatar" variant="secondary" />
                  <FieldError />
                </TextField>

              </Fieldset.Group>
              <Fieldset.Actions>
                <Button
                  type="submit"
                  isDisabled={isLoading}
                  className="rounded-full"
                >
                  {isLoading ? "Loading.." : "Register "}
                </Button>

                <Button type="reset" variant="tertiary">
                  Reset
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
