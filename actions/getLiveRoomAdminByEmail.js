"use server";

export const getLiveRoomAdminByEmail = async (email) => {
  if (!email) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getliveroomadminbyemail/${email}`
  );
  const admin = await response.json();

  return admin;
};
