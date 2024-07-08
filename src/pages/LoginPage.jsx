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
import { Link } from "react-router-dom";
import { useAuth } from "@/providers/user.context";
import { motion } from "framer-motion";

function LoginPage() {
  const { login } = useAuth();
  const [isWrong, setIsWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(ev) {
    ev.preventDefault();
    setIsLoading(true);
    const formData = new FormData(ev.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      await login({ username, password });
      setIsWrong(false);
    } catch (err) {
      console.error("Login error:", err);
      setIsWrong(true);
    } finally {
      setIsLoading(false);
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
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username:</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter Your Username"
                />
                <Label htmlFor="password">Password:</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                />
              </div>
              {isWrong ? (
                <p className="text-red-500">Incorrect username or password</p>
              ) : (
                <br />
              )}
              <Button className="w-24" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="p-0 flex flex-col mt-2">
            <Label>
              Don't Have an Account?{" "}
              <Link className="font-bold underline" to="../register">
                Register
              </Link>
            </Label>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default LoginPage;
