"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useBlog } from "@/src/context/BlogContext";
import HtmlBlogForm from "@/src/components/blog/html/htm-blog-form";
import "react-quill-new/dist/quill.snow.css";
import { SidebarInset } from "@/components/ui/sidebar";
import { HtmlBlogType } from "@/src/services/blog.types";

// Dynamically import react-scroll to prevent SSR issues
const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: false }
);

const HtmlBlog = () => {
  const { blogData, loading, error } = useBlog();
  const [isClient, setIsClient] = useState(false);

  // Ensure rendering happens only after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SidebarInset>
      <div id="html-blog" className="p-4 md:p-8">
        <HtmlBlogForm />
        <div>
          {isClient &&
            blogData?.map((item: HtmlBlogType, index: number) => (
              <Element name={item?.menuName.replace(/\s+/g, "-")} key={index}>
                <div className="text-gray-500">
                  <h4 className="mb-3 text-[#374151]">
                    <strong>{item?.heading}</strong>
                  </h4>
                  {isClient && (
                    <>
                      <div
                        className="mb-3 content"
                        dangerouslySetInnerHTML={{ __html: item?.content }}
                      />
                      <div
                        className="mb-5 example"
                        dangerouslySetInnerHTML={{ __html: item?.example }}
                      />
                    </>
                  )}
                </div>
              </Element>
            ))}
        </div>
      </div>
    </SidebarInset>
  );
};

export default HtmlBlog;
