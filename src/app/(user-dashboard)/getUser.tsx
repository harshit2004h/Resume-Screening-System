"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function fetchUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return {
    given_name: user?.given_name || "User",
    family_name: user?.family_name || "",
    email: user?.email || "",
    picture: user?.picture || "",
  };
}
