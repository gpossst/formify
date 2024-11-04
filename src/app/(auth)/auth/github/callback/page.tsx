"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function GitHubCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (state !== localStorage.getItem("latestCSRFToken")) {
        console.error("State mismatch - possible CSRF attack");
        router.push("/");
        return;
      }
      localStorage.removeItem("latestCSRFToken");

      try {
        const authResponse = await axios.post("/api/github/oauth", { code });
        const { access_token } = authResponse.data;
        console.log("access_token", access_token);
        const userExists = await axios.post("/api/mongodb/user/retrieve", {
          access_token,
        });

        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            ...userExists.data,
            access_token,
          })
        );

        if (userExists.data.exists) {
          router.push("/dashboard");
        } else {
          router.push("/onboard");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        router.push("/error");
      }
    }

    if (searchParams.get("code")) {
      handleCallback();
    }
  }, [searchParams, router]);

  return <div>Processing GitHub authentication...</div>;
}
