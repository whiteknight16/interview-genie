"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAiInsights } from "./dashboard";
//For onboarding part
export async function updateUser(data: {
  bio: string;
  experience: number;
  skills: string[];
  industry: string;
}) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    return await db.$transaction(
      async (tx) => {
        // Check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        // If industry does not exist, create it
        if (!industryInsight) {
          const insights = await generateAiInsights(data.industry);
          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
          return industryInsight;
        }

        // Update user
        const updatedUser = await tx.user.update({
          where: { clerkUserId: userId },
          data: {
            industry: data.industry,
            bio: data.bio,
            experience: data.experience,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );
    return { success: true, ...result };
  } catch (error: any) {
    console.log("Error in onboarding:", error.message);
    throw new Error("Error in onboarding");
  }
}

export async function getOnBoardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return { isOnboarded: !!user?.industry };
  } catch (error: any) {
    console.log("Error in checking onboarding status:", error.message);
    throw new Error("Error in checking onboarding status");
  }
}
