"use client";

import { FaGithub } from "react-icons/fa";

export default function GitHubSignIn({ size }: { size: number }) {
  const handleSignIn = () => {
    // Generate random state for CSRF protection
    const state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    localStorage.setItem("latestCSRFToken", state);

    // Construct GitHub OAuth URL
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      redirect_uri: `http://localhost:3000/auth/github/callback`,
      scope: "read:user user:email",
      state: state,
    });

    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  if (size == 1) {
    return (
      <button
        onClick={handleSignIn}
        className="px-4 flex items-center gap-2 text-foreground text-xl font-semibold py-2 bg-accent border-accent border-2 rounded-md hover:bg-accent shadow-2xl"
      >
        <FaGithub className="text-foreground" size={30} />
        Sign in with GitHub
      </button>
    );
  } else {
    {
      return (
        <button
          onClick={handleSignIn}
          className="px-2 flex items-center gap-2 text-foreground text-lg font-semibold py-1 bg-accent border-accent border-2 rounded-md hover:bg-accent"
        >
          <FaGithub className="text-foreground" size={24} />
          Sign in with GitHub
        </button>
      );
    }
  }
}
