"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GitHubSignIn from "./GitHubSignIn";

function HomeNav() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="flex text-foreground justify-between items-center p-4 font-merriweather-sans absolute top-0 w-full">
      <div className="flex gap-4 items-center">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          {darkMode ? (
            <Image
              src="/logo_dark.png"
              alt="Formify Logo Dark"
              width={43}
              height={50}
            />
          ) : (
            <Image
              src="/logo_light.png"
              alt="Formify Logo Light"
              width={43}
              height={50}
            />
          )}
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
