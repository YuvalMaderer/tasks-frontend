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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "@/services/api.service";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, message } = formData;
    try {
      const response = await api.post("/contact/send", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      } else {
        setStatus("failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        <Card className="w-[600px] shadow-xl">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name:</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Label htmlFor="message">Message:</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <br />
                <Button
                  className={`w-24 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disable={loading.toString()}
                >
                  {loading ? "Loading..." : "Send"}
                </Button>
                {status && <p className="mt-2">{status}</p>}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="p-0 flex flex-col mt-2">
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

export default ContactPage;
