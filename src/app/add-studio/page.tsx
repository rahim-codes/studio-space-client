"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const amenitiesList = [
  "Cyc wall",
  "Strobe lighting kit",
  "Changing room",
  "Wi-Fi",
  "Parking",
  "Air conditioning",
  "Green room",
  "Soundproofing",
];

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studio",
    price: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    amenities: [] as string[],
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle checkbox selection for amenities
  const handleCheckboxChange = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      if (exists) {
        return {
          ...prev,
          amenities: prev.amenities.filter((item) => item !== amenity),
        };
      } else {
        return { ...prev, amenities: [...prev.amenities, amenity] };
      }
    });
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const imgData = new FormData();
        imgData.append("image", imageFile);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imgData,
          },
        );

        const imgResult = await imgRes.json();
        if (imgResult.success) {
          imageUrl = imgResult.data.url;
        } else {
          throw new Error("Image upload to ImgBB failed");
        }
      } else {
        throw new Error("Please select an image file");
      }
      const studioPayload = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
        hostName: user?.name || "Anonymous Host",
        hostEmail: user?.email || "anonymous@gmail.com",
      };
      console.log(studioPayload);
      const res = await fetch("/api/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(studioPayload),
      });

      if (res.status === 401) {
        toast.error("Please sign in to add a studio.");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to add studio");
      }

      toast.success("Studio added successfully!");
      router.push("/my-listings");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#0b0f17] py-12 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Add New Studio
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            List your space for creators to discover and book.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-card p-8 sm:p-10 rounded-3xl shadow-sm border border-border space-y-6"
        >
          {/* Row 1: Title, Category, Hourly Rate, Security Deposit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Title
              </label>
              <Input
                type="text"
                placeholder="e.g. Northlight Cyc Wall"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full h-11 px-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Photo Studio">Photo Studio</option>
                <option value="Film Stage">Film Stage</option>
                <option value="Podcast Lounge">Podcast Lounge</option>
                <option value="Music Suite">Music Suite</option>
                <option value="Workshop">Workshop</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Hourly rate ($)
              </label>
              <Input
                type="number"
                placeholder="45"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Security deposit ($)
              </label>
              <Input
                type="number"
                placeholder="50"
                required
                value={formData.securityDeposit}
                onChange={(e) =>
                  setFormData({ ...formData, securityDeposit: e.target.value })
                }
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>
          </div>

          {/* Row 2: Max Capacity, Location, Image URL, Host Name, Host Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Max capacity
              </label>
              <Input
                type="number"
                placeholder="12"
                required
                value={formData.maxCapacity}
                onChange={(e) =>
                  setFormData({ ...formData, maxCapacity: e.target.value })
                }
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Location / Address
              </label>
              <Input
                type="text"
                placeholder="Street, area, city"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Image
              </label>
              <Input
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Host name
              </label>
              <Input
                type="text"
                readOnly
                value={user?.name || "Loading..."}
                className="h-11 rounded-xl border-border bg-muted text-muted-foreground text-sm cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground">
                Host email
              </label>
              <Input
                type="email"
                readOnly
                value={user?.email || "Loading..."}
                className="h-11 rounded-xl border-border bg-muted text-muted-foreground text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Amenities Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground block">
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleCheckboxChange(amenity)}
                    className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Detailed overview
            </label>
            <textarea
              rows={4}
              placeholder="Describe the space, gear and rules"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 h-11 bg-[#f59e0b] hover:bg-[#d97706] text-foreground font-semibold rounded-xl text-sm transition-all shadow-none cursor-pointer"
          >
            {loading ? "Adding Studio..." : "Add Studio"}
          </Button>
        </form>
      </div>
    </div>
  );
}
