"use client";

import { useEffect, useState } from "react";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage?.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return {
    userInfo,
    isLoading,
    error,
  };
};
