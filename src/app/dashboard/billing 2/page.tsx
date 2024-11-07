import DashBilling from "@/app/components/DashBilling";
import DashBillingNav from "@/app/components/DashBillingNav";
import React from "react";

function page() {
  return (
    <div className="w-full h-full flex flex-col p-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold font-fredoka text-foreground">
          Billing
        </h1>
        <DashBillingNav />
      </div>
      <div className="w-full h-full flex flex-1 justify-center items-center">
        <DashBilling />
      </div>
    </div>
  );
}

export default page;
