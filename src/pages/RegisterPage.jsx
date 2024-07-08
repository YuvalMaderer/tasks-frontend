import React from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

function RegisterPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleRegister(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    try {
      await api.post("/auth/register", {
        username,
        password,
        email,
        firstName,
        lastName,
      });

      toast({
        title: "Registration Successful",
        description: "You have been successfully registered.",
      });

      navigate("../login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an issue with your registration.",
      });
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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  required
                />
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
