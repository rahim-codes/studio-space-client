"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface BookingWidgetProps {
  studio: {
    title: string;
    price: number;
    securityDeposit: number;
  };
}

export default function BookingWidget({ studio }: BookingWidgetProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState(2); // Default 2 hours
  const [loading, setLoading] = useState(false);

  // Calculations
  const subtotal = studio.price * hours;
  const total = subtotal + studio.securityDeposit;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !startTime) {
      toast.error("Please select date and start time.");
      return;
    }

    setLoading(true);

    const bookingPayload = {
      title: studio.title,
      price: studio.price,
      securityDeposit: studio.securityDeposit,
      date,
      startTime,
      hours,
      totalAmount: total,
      // User information (Logged-in user context)
      userInfo: {
        userName: user?.name,
        userEmail: user?.email,
      },
    };

    try {
      const res = await fetch(
        "https://studio-space-server-ten.vercel.app/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bookingPayload),
        },
      );

      if (res.status === 401) {
        toast.error("Please sign in to book this workspace.");
        return;
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Workspace booking request submitted successfully!");
        // Form reset
        setDate("");
        setStartTime("");
      } else {
        toast.error(data.message || "Failed to book workspace.");
      }
    } catch (error) {
      console.error("Booking submit error:", error);
      toast.error("Something went wrong while booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 sm:p-8 rounded-3xl shadow-xl border border-border space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline gap-1 border-b border-border pb-4">
        <span className="text-3xl font-extrabold text-foreground">
          ${studio.price}
        </span>
        <span className="text-sm text-muted-foreground font-medium">/ hr</span>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="space-y-4">
        {/* Date Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Date</label>
          <Input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 rounded-xl border-border bg-card text-sm"
          />
        </div>

        {/* Start Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Start time
          </label>
          <Input
            type="time"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="h-11 rounded-xl border-border bg-card text-sm"
          />
        </div>

        {/* Hours Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Hours</label>
          <select
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-11 px-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value={1}>1 hour</option>
            <option value={2}>2 hours</option>
            <option value={3}>3 hours</option>
            <option value={4}>4 hours</option>
            <option value={6}>6 hours</option>
            <option value={8}>8 hours</option>
          </select>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-2 pt-4 border-t border-border text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal ({hours} hrs)</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Security deposit</span>
            <span>${studio.securityDeposit}</span>
          </div>
          <div className="flex justify-between font-extrabold text-base text-foreground pt-2 border-t border-dashed border-border">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-[#f59e0b] hover:bg-[#d97706] text-foreground font-bold rounded-xl text-sm transition-all shadow-none cursor-pointer"
        >
          {loading ? "Booking Workspace..." : "Book Workspace Now"}
        </Button>
      </form>
    </div>
  );
}
