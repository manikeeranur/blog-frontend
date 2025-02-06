"use client";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import dynamic from "next/dynamic";

const HtmlBlog = dynamic(() => import("@/src/components/blog/html/html-blog"), {
  ssr: false,
});

export default function Page() {
  return (
    <ProtectedRoute>
      <HtmlBlog />
    </ProtectedRoute>
  );
}
