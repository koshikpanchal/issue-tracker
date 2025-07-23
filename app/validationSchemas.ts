import { z } from "zod";
export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(232, "Title must be less than 232 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535, "Description must be less than 1000 characters"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(232, "Title must be less than 232 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535, "Description must be less than 1000 characters")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned user is required")
    .max(255, "Assigned user ID must be less than 255 characters")
    .optional()
    .nullable(),
});
