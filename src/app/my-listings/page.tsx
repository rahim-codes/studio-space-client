"use client";

import UpdateStudioModal from "@/components/ListingsPage/UpdateStudioModal";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Studio {
  _id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  image: string;
  hostEmail: string;
}

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  // Update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatingStudioId, setUpdatingStudioId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudioId, setSelectedStudioId] = useState<string | null>(null);

  // Fetch logged-in user's listings
  const fetchMyListings = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:8000/my-studios/${email}`);
      const data = await res.json();
      if (data.success) {
        setStudios(data.data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Failed to load your listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMyListings(user.email);
    }
  }, [user]);

  // Open Delete Confirmation Modal
  const confirmDelete = (id: string) => {
    setSelectedStudioId(id);
    setIsModalOpen(true);
  };

  // Handle Delete Action
  const handleDelete = async () => {
    if (!selectedStudioId) return;

    try {
      const res = await fetch(
        `http://localhost:8000/studios/${selectedStudioId}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();

      if (data.success) {
        toast.success("Studio deleted successfully!");
        setStudios(studios.filter((s) => s._id !== selectedStudioId));
      } else {
        throw new Error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting.");
    } finally {
      setIsModalOpen(false);
      setSelectedStudioId(null);
    }
  };

  // Update button handler:
  const handleOpenUpdate = (id: string) => {
    setUpdatingStudioId(id);
    setIsUpdateModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
        <p className="text-gray-500 font-medium">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-12 px-6 lg:px-20 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            My Studio Listings
          </h1>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {studios.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-base font-semibold">
                You haven&apos;t added any studios yet.
              </p>
              <Button
                onClick={() => router.push("/studios/add")}
                className="mt-4 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold rounded-xl"
              >
                Add Your First Studio
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                    <th className="py-4 px-6">Studio</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Rate</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {studios.map((studio) => (
                    <tr
                      key={studio._id}
                      className="hover:bg-gray-50/50 transition-all"
                    >
                      <td className="py-4 px-6 font-bold text-black flex items-center gap-3">
                        {studio.title}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-800 font-semibold text-xs">
                          {studio.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium">
                        ${studio.price} / hr
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {studio.location}, Dhaka
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button
                          onClick={() => handleOpenUpdate(studio._id)}
                          className="px-4 h-9 bg-black hover:bg-gray-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => confirmDelete(studio._id)}
                          className="px-4 h-9 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold rounded-xl cursor-pointer"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-black tracking-tight">
                Delete this listing?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                This permanently removes the studio and cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="px-5 h-11 rounded-xl border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="px-5 h-11 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-semibold text-sm rounded-xl cursor-pointer shadow-none"
              >
                Yes, delete
              </Button>
            </div>
          </div>
        </div>
      )}
      <UpdateStudioModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        studioId={updatingStudioId}
        onUpdated={() => {
          if (user?.email) fetchMyListings(user.email);
        }}
      />
      ;
    </div>
  );
}
