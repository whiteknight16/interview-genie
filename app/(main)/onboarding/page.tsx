import React from "react";
import OnboardingForm from "../_components/OnboardingForm";
import { getOnBoardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
async function OnboardingPage() {
  //Check if user is onboarded
  const { isOnboarded } = await getOnBoardingStatus();
  if (isOnboarded) {
    //Redirect to dashboard
    redirect("/dashboard");
  }
  return (
    <div>
      <OnboardingForm industries={industries} />
    </div>
  );
}

export default OnboardingPage;
