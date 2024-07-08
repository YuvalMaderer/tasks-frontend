import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/providers/user.context";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { loggedInUser } = useAuth();

  // Destructure the necessary properties from the loggedInUser object
  const { firstName, lastName, email, bio } = loggedInUser || {};

  return (
    <div className="flex justify-center items-center pt-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Set constraints if needed
      >
        <Card className="w-[600px] shadow-xl">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <p>
                  <strong>Name:</strong> {firstName} {lastName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="p-0 flex flex-col mt-1">
              <Label>
                Want to go back?{" "}
                <Link className="font-bold underline" to="../">
                  Home
                </Link>
              </Label>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
