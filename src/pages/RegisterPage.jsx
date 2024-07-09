import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api.service";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(
    "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
  );
  const navigate = useNavigate();

  function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handlePasswordChange(ev) {
    const password = ev.target.value;
    if (!validatePassword(password)) {
      setPasswordMessage(
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
    } else {
      setPasswordMessage("Password is valid.");
    }
  }

  async function handleRegister(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        password,
        email,
        firstName,
        lastName,
      });

      navigate("../login");
    } catch (error) {
      setErrorMessage("There was an issue with your registration.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username:</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter Your Username"
                  required
                />
                <Label htmlFor="password">Password:</Label>

                <HoverCard>
                  <HoverCardTrigger>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter Your Password"
                      required
                      onChange={handlePasswordChange}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>{passwordMessage}</HoverCardContent>
                </HoverCard>
                <Label htmlFor="email">Email:</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  required
                />
                <Label htmlFor="firstName">First Name:</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  required
                />
                <Label htmlFor="lastName">Last Name:</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
              )}
            </div>
            <Button className="w-24 mt-3" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="p-0 flex flex-col">
            <Label>
              Already Have an Account?{" "}
              <Link className="font-bold underline" to="../login">
                Login
              </Link>
            </Label>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default RegisterPage;
