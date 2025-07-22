import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return Response.json(users);
}
