import { z } from "zod";
export const onBoardingSchema = z.object({
  industry: z.string({
    required_error: "Industry is required",
  }),
  subIndustry: z.string({
    required_error: "Please select a specialization",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string({ required_error: "Experience is required" })
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(0, { message: "Experience must be at least 0 years " })
        .max(60, { message: "Experience can be at most 60 years" })
    ),

  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});
