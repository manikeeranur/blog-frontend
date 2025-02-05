"use client";
import { ReactNode } from "react";
import { useAuth } from "@/src/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // Prevents rendering until authentication check is done
  }

  return <>{children}</>;
}
