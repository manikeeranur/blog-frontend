"use client";
import React from "react";
import { Element } from "react-scroll";
import { useBlog } from "@/src/context/BlogContext";
import HtmlBlogForm from "@/src/components/blog/html/htm-blog-form";
import "react-quill-new/dist/quill.snow.css";
import { SidebarInset } from "@/components/ui/sidebar";
const HtmlBlog = () => {
  const { blogData, loading, error } = useBlog();
  console.log("blogData", blogData);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <SidebarInset>
      <div id="html-blog" className="p-4 md:p-8">
        <HtmlBlogForm />
        <div className="">
          {blogData?.map((item: any, index: any) => (
            <Element name={item?.menuName.replace(/\s+/g, "-")} key={index}>
              <div className="text-gray-500">
                <h4 className="mb-3 text-[#374151]">
                  <strong> {item?.heading}</strong>
                </h4>
                <div
                  className="mb-3 content"
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                ></div>
                <div
                  className="mb-5 example"
                  dangerouslySetInnerHTML={{ __html: item?.example }}
                ></div>
              </div>
            </Element>
          ))}
        </div>
      </div>
    </SidebarInset>
  );
};

export default HtmlBlog;
