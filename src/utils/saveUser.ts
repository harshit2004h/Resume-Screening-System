"use server";

import { prisma } from "@/src/lib/db";
import { Role } from "@prisma/client";

export async function saveUserToDatabase({
  email,
  id,
  firstName,
  lastName,
  profileImage,
  role,
}: {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: "employer" | "employee";
}) {
  const prismaRole = role === "employer" ? Role.employer : Role.employee;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        id,
        email,
        firstName,
        lastName,
        profileImage,
        role: prismaRole,
      },
    });
  }
}
