"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UpdateStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  studioId: string | null;
  onUpdated: () => void;
}

export default function UpdateStudioModal({
  isOpen,
  onClose,
  studioId,
  onUpdated,
}: UpdateStudioModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studio",
    price: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    description: "",
  });

  // Fetch single studio data when modal opens and studioId is available
  useEffect(() => {
    if (isOpen && studioId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetch(`https://studio-space-server-ten.vercel.app/studios/${studioId}`)
        .then((res) => res.json())
        .then((data) => {
          const studio = data.data || data;
          setFormData({
            title: studio.title || "",
            category: studio.category || "Photo Studio",
            price: studio.price?.toString() || "",
            securityDeposit: studio.securityDeposit?.toString() || "",
            maxCapacity: studio.maxCapacity?.toString() || "",
            location: studio.location || "",
            image: studio.image || "",
            description: studio.description || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load studio details:", err);
          toast.error("Failed to load studio data.");
          setLoading(false);
        });
    }
  }, [isOpen, studioId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://studio-space-server-ten.vercel.app/studios/${studioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Studio updated successfully!");
        onUpdated(); // List refresh korar jonno
        onClose();
      } else {
        throw new Error(data.message || "Failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-card rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-border space-y-6 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-muted-foreground transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
            Update Studio Listing
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Modify your studio information below.
          </p>
        </div>

        {loading && !formData.title ? (
          <div className="py-12 text-center text-muted-foreground font-medium">
            Loading studio data...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Title
                </label>
                <Input
                  type="text"
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
                  required
                  value={formData.securityDeposit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      securityDeposit: e.target.value,
                    })
                  }
                  className="h-11 rounded-xl border-border bg-card text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Max capacity
                </label>
                <Input
                  type="number"
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
                  Location
                </label>
                <Input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="h-11 rounded-xl border-border bg-card text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Image URL
              </label>
              <Input
                type="text"
                required
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="h-11 rounded-xl border-border bg-card text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Detailed overview
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-5 h-11 rounded-xl border-border text-foreground font-semibold text-sm hover:bg-muted cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-6 h-11 bg-[#f59e0b] hover:bg-[#d97706] text-foreground font-semibold text-sm rounded-xl cursor-pointer shadow-none"
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
