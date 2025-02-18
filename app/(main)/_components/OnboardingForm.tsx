"use client";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { onBoardingSchema } from "../../../lib/formSchema";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";
interface IndustriesInterface {
  id: string;
  name: string;
  subIndustries: string[];
}

interface OnboardingFormProps {
  industries: IndustriesInterface[];
}

type FormData = z.infer<typeof onBoardingSchema>;

function OnboardingForm({ industries }: OnboardingFormProps) {
  const [selectedIndustry, setSelectedIndustry] =
    useState<IndustriesInterface | null>(null);
  const [bioLength, setBioLength] = useState<number>(0);
  const router = useRouter();

  const {
    data: updateResult,
    loading: updateLoading,
    fn: updateUserFn,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(onBoardingSchema),
  });

  const watchIndustry = watch("industry");

  const onSubmit = async (values: FormData) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.log("Error in onboarding:", error.message);
    }
  };
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile updated successfully");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  return (
    <div className="flex justify-center w-full items-start min-h-screen p-3 dark:bg-gray-900">
      <Card className="w-full max-w-5xl p-4 rounded-2xl shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-center dark:text-white">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Select your industry for personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((industry) => industry.id === value) || null
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger className="w-full dark:bg-gray-700">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries?.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {watchIndustry && (
              <div>
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger className="w-full dark:bg-gray-700">
                    <SelectValue placeholder="Select a sub-industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="60"
                placeholder="Enter your years of experience"
                className="dark:bg-gray-700"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                type="text"
                placeholder="e.g., Python, React, Node.js"
                className="dark:bg-gray-700"
                {...register("skills")}
              />
              <p className="text-sm text-gray-400">
                Enter skills as comma-separated values.
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                maxLength={500}
                placeholder="Enter a short bio (max 500 characters)"
                className="dark:bg-gray-700"
                {...register("bio")}
                onChange={(e) => setBioLength(e.target.value.length)}
              />
              <p
                className={`text-sm ${
                  bioLength <= 500 ? "text-green-500" : "text-red-500"
                }`}
              >
                {bioLength}/500
              </p>
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="w-full dark:bg-blue-600 dark:text-white"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Updating....
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnboardingForm;
