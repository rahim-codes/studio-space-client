"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, photoUrl, password } = formData;

    // Password Validation Check
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one Uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one Lowercase letter.");
      return;
    }

    const user: {
      name: string;
      email: string;
      photoUrl: string;
      password: string;
    } = { name, email, photoUrl, password };

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      toast.success("User Register Successful!");
      redirect("/");
    }
    if (error) {
      toast.error(error.message ?? "Something is wrong try again");
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("User Register Successfully");
      redirect("/");
    }
    if (!data) {
      toast.error("Something is wrong please try again");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#0b0f17] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card rounded-3xl border-none shadow-sm p-4 sm:p-6">
        <CardHeader className="space-y-1.5 px-0 pt-0">
          <CardTitle className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Join StudioSpace to book or host creative spaces.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 pb-0 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-foreground"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-11 rounded-xl border-border bg-card placeholder:text-muted-foreground focus-visible:ring-amber-500 text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-11 rounded-xl border-border bg-card placeholder:text-muted-foreground focus-visible:ring-amber-500 text-sm"
              />
            </div>

            {/* Photo URL Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="photoUrl"
                className="text-xs font-semibold text-foreground"
              >
                Photo URL
              </Label>
              <Input
                id="photoUrl"
                name="photoUrl"
                type="url"
                placeholder="https://"
                value={formData.photoUrl}
                onChange={handleChange}
                className="h-11 rounded-xl border-border bg-card placeholder:text-muted-foreground focus-visible:ring-amber-500 text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-foreground"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="h-11 rounded-xl border-border bg-card placeholder:text-muted-foreground focus-visible:ring-amber-500 text-sm"
              />
              <p className="text-[11px] text-muted-foreground pt-0.5 leading-tight">
                Needs an uppercase letter, a lowercase letter and 6+ characters.
              </p>
            </div>

            {/* Register Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#f59e0b] hover:bg-[#d97706] text-foreground font-semibold rounded-xl text-sm transition-all shadow-none mt-2"
            >
              Register
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <span className="relative z-10 bg-card px-2 text-xs text-muted-foreground font-medium">
              or
            </span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
          </div>

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-11 border border-border rounded-xl font-semibold text-foreground text-sm hover:bg-muted transition-all bg-card"
          >
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-amber-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
