"use client";
import dynamic from "next/dynamic";

const BlogDetails = dynamic(
  () => import("@/src/components/blog/blog-details/index"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <BlogDetails />
    </>
  );
}
