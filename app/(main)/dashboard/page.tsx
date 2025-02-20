import React from "react";
import { getOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { getIndustryInsights } from "@/actions/dashboard";
import DashboardComponent from "../_components/DashboardComponent";
async function DashboardPage() {
  const { isOnboarded } = await getOnBoardingStatus();
  const inSights = await getIndustryInsights();
  if (!isOnboarded) {
    //Redirect to dashboard
    redirect("/onboarding");
  }
  return (
    <div>
      <DashboardComponent insights={inSights} />
    </div>
  );
}

export default DashboardPage;
