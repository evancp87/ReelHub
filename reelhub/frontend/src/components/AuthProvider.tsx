"use client";
import { useRouter } from "next/navigation";
import { useIsAuthenticated } from "@/store/hooks";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();
  const currentRoute = usePathname();

  // get user from localStorage
  const currUser =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

  useEffect(() => {
    // if is not auth, redirect to login
    if (!isAuthenticated) {
      router.push("/authentication/login");
    }

    // if currUser and tries to visit any of these pages is redirected
    if (
      currUser &&
      (currentRoute === "/authentication/login" ||
        currentRoute === "/authentication/register" ||
        currentRoute === "/")
    ) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, currUser, currentRoute]);

  if (!isAuthenticated) {
    return null;
  }
  return children;
};

export default AuthProvider;
