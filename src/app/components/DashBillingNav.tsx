"use client";

import React from "react";
import { useRouter } from "next/navigation";

function DashBillingNav() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => router.push("/dashboard/billing/payment")}
        className="bg-primary text-background bg-foreground px-4 py-2 rounded-md flex items-center gap-1 text-lg font-merriweather hover:bg-accent hover:text-foreground transition-all duration-300"
      >
        Payment
      </button>
      <button
        onClick={() => router.push("/dashboard/billing/plans")}
        className="bg-primary text-background bg-foreground px-4 py-2 rounded-md flex items-center gap-1 text-lg font-merriweather hover:bg-accent hover:text-foreground transition-all duration-300"
      >
        Plans
      </button>
    </div>
  );
}

export default DashBillingNav;
