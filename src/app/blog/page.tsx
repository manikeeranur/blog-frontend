"use client";
import dynamic from "next/dynamic";
const Blog = dynamic(() => import("@/src/components/blog/blog"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Blog />
    </>
  );
}
