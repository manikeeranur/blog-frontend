"use client";
import Blog from "@/src/components/blog/blog";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function Page() {
  return (
    <>
      <ProtectedRoute>
        <Blog />
      </ProtectedRoute>
    </>
  );
}
