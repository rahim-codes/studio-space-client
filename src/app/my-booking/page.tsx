"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Booking {
  _id: string;

  title: string;
  date: string;
  startTime: string;
  hours: number;
  totalAmount: number;
  status: "pending" | "Confirmed" | "Completed" | "Cancelled";
  location?: string;
}

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for logged-in user
  const fetchMyBookings = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:8000/bookings/${email}`);
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMyBookings(user.email);
    }
  }, [user]);

  // Handle Cancel Booking
  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Booking cancelled successfully!");
        // Update local state
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "Cancelled" } : b,
          ),
        );
      } else {
        throw new Error(data.message || "Failed to cancel");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while cancelling the booking.");
    }
  };

  // Status Badge Styling Helper
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold text-xs">
            Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
            Confirmed
          </span>
        );
      case "Completed":
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs">
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-semibold text-xs">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-semibold text-xs">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <p className="text-gray-500 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-12 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Track every reservation and its status.
          </p>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 text-gray-500">
              <p className="font-semibold text-base">
                You have no bookings yet.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md"
              >
                {/* Left Info */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-black tracking-tight">
                    {booking.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {booking.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {booking.startTime} (
                      {booking.hours} hrs)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />{" "}
                      {booking.location || "Dhaka, Bangladesh"}
                    </span>
                  </div>
                </div>

                {/* Right Status, Price & Actions */}
                <div className="flex items-center gap-4 justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center gap-3">
                    {renderStatusBadge(booking.status)}
                    <span className="text-lg font-extrabold text-black">
                      ${booking.totalAmount}
                    </span>
                  </div>

                  {/* Cancel Button only for Pending status */}
                  {booking.status === "pending" && (
                    <Button
                      onClick={() => handleCancelBooking(booking._id)}
                      variant="outline"
                      className="px-4 h-9 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
