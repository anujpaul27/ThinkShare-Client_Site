"use client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";

export default function OnSurface() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const UserObj = Object.fromEntries(formData.entries());

    alert(JSON.stringify(UserObj));
  };

  return (
    <div className="lg:w-full   h-screen  flex justify-center lg:items-center  ">
      <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
        <Surface className="w-full min-w-[380px]">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full ">
              <Fieldset.Legend className=" text-3xl text-center ">
                ThinkShare Register
              </Fieldset.Legend>
              <Description className="text-xl text-center my-2 ">
                {" "}
                Register is the first ThinkShare{" "}
              </Description>
              <Fieldset.Group>
                <TextField
                  isRequired
                  name="name"
                  validate={(value) => {
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
                  <Input placeholder="Enter your password" />
                  <Description>
                    Must be at least 8 characters with 1 uppercase and 1 number
                  </Description>
                  <FieldError />
                </TextField>

              </Fieldset.Group>
              <Fieldset.Actions>
                <Button type="submit">Save changes</Button>
                <Button type="reset" variant="tertiary">
                  Cancel
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
