"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import model from "@/lib/gemini.config";
export const generateAiInsights = async (industry: string) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "HIGH" | "MEDIUM" | "LOW",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 6 common roles for salary ranges.
    Growth rate should be a percentage.
    Include at least 6 skills and trends.
    The given data should be more of India specific.
    Salary should be in LPA and in Indian Rupees
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

//Function to get the industry insights for the user dashboard
export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      industryInsight: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.industryInsight) {
    const insights = await generateAiInsights(user.industry);
    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return industryInsight;
  }

  return user.industryInsight;
}
