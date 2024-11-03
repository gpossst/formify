"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface UserData {
  exists: boolean;
  githubUser: {
    name: string;
    email: string;
    githubId: string;
    avatar_url: string;
    login: string;
    company?: string;
    location?: string;
  };
  access_token: string;
}

interface FormData {
  name: string;
  email: string;
  avatar_url: string;
}

export default function OnboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    avatar_url: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("userData");
      if (!storedData) {
        router.push("/");
        return;
      }

      const data: UserData = JSON.parse(storedData);
      setUserData(data);

      setFormData({
        name: data.githubUser.name || "",
        email: data.githubUser.email || "",
        avatar_url: data.githubUser.avatar_url || "",
      });
    }
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    try {
      await axios.post("/api/mongodb/user/create", {
        ...formData,
        rollover_date: new Date().toISOString(),
        entries_this_month: 0,
        account_created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        subscription_tier: "free",
      });

      sessionStorage.removeItem("userData");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user data found. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Complete your profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Avatar */}
          <div className="flex justify-center">
            <Image
              src={formData.avatar_url}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full"
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium"
              onClick={handleSubmit}
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
