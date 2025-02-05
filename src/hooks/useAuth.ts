"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      //   router.push("/login");
      router.push("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return { isAuthenticated };
}
