"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Save, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// Type Interface 
interface UserSession {
  user?: {
    id: string;
  }
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession() as {
    data: UserSession | undefined;
    isPending: boolean;
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  // Load user data
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          id: session.user.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please login first</div>;

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-base-100 dark:bg-neutral-900 rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-base-content/70">Manage your account information</p>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-base-300">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-base-300 flex items-center justify-center">
                    <User className="w-20 h-20 text-base-content/50" />
                  </div>
                )}
              </div>

              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-primary text-white p-3 rounded-full cursor-pointer hover:bg-primary-focus transition">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                   
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="input input-bordered w-full"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="input input-bordered w-full bg-base-200"
              />
              <p className="text-xs text-base-content/60 mt-1">Email cannot be changed</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary flex-1"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn btn-primary flex-1 gap-2"
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}