"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Logo({ size }: { size: number }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <div>
      {darkMode ? (
        <Image
          src="/logo_dark.png"
          alt="Formify Logo Dark"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      ) : (
        <Image
          src="/logo_light.png"
          alt="Formify Logo Light"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      )}
    </div>
  );
}

export default Logo;