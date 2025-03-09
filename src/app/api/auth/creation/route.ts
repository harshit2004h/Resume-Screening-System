import { prisma } from "@/src/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const { role } = await req.json();
    if (role !== "Employee" && role !== "Employer") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
          isEmployee: role === "Employee", // Restore correct logic
        },
      });
    } else {
      // If user exists, update role
      dbUser = await prisma.user.update({
        where: { id: user.id },
        data: { isEmployee: role === "Employee" }, // Restore correct logic
      });
    }

    // Redirect URL based on `isEmployee`
    const redirectUrl = dbUser.isEmployee
      ? "http://localhost:3000/u/dashboard"
      : "http://localhost:3000/h/dashboard";

    return NextResponse.json({ redirectUrl }, { status: 200 });
  } catch (error) {
    console.error("Error in role assignment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
