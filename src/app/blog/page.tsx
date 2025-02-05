"use client";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import dynamic from "next/dynamic";

const HtmlBlogForm = dynamic(
  () => import("@/src/components/blog/html/htm-blog-form"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <HtmlBlogForm />
      </div>
    </ProtectedRoute>
  );
}
