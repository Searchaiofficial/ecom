"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserInfo = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
    // return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await response.json();

  return user;
};
