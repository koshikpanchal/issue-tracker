import { z } from "zod";
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(232, "Title must be less than 232 characters"),
  description: z.string().min(1, "Description is required"),
});
