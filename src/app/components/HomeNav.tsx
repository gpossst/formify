"use client";

import React from "react";
import { useRouter } from "next/navigation";
import GitHubSignIn from "./GitHubSignIn";
import Logo from "./Logo";

function HomeNav() {
  const router = useRouter();
  return (
    <div className="flex text-foreground justify-between items-center p-4 font-merriweather-sans absolute top-0 w-full">
      <div className="flex gap-4 items-center">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo size={50} />
        </div>
        <div
          className="cursor-pointer text-lg font-semibold"
          onClick={() => router.push("/")}
        >
          Documentation
        </div>
        <div
          className="cursor-pointer text-lg font-semibold"
          onClick={() => router.push("/")}
        >
          Pricing
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <GitHubSignIn size={0} />
      </div>
    </div>
  );
}

export default HomeNav;
