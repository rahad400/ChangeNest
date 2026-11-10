"use client";

import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";

const SignInPage = async () => {
  const [isVisible, setIsVisible] = useState(false);

  const heandleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmpassword: string;
    };
    // console.log("user data is there", user);

    if (user.password !== user.confirmpassword) {
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      toast.success(`Successful sign up ${user.name} !`);
      console.log(data)
    }

    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };
  return (
    <div className="container mx-auto px-4 my-6">
      <Form
        className="flex w-96 flex-col gap-4"
        render={(props) => <form {...props} data-custom="foo" />}
        onSubmit={heandleSubmit}
      >
        <TextField isRequired name="name" type="name" minLength={3}>
          <Label> Full Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField className="w-full max-w-[280px]" name="password">
          <Label>Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-[280px]"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              isRequired
              minLength={8}
              name="password"
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
              //   value={isVisible ? "87$2h.3diua" : "••••••••"}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
        </TextField>
        <TextField className="w-full max-w-[280px]" name="password">
          <Label>Confirm Password</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full max-w-[280px]"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              isRequired
              minLength={8}
              name="confirmpassword"
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
              //   value={isVisible ? "87$2h.3diua" : "••••••••"}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
        </TextField>
        <div className="flex gap-2">
          <Button
            type="submit"
            className={
              "bg-[#16a34a] hover:bg-black hover:text-white text-black"
            }
          >
            <Check />
            Sign In
          </Button>
          <Button
            type="reset"
            variant="secondary"
            className={"text-red-500  border-2 border-red-500 rounded-xxl"}
          >
            <FcCancel />
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
