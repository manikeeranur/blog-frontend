"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getBlogByContentType } from "@/src/services/BlogServices";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "@/src/components/tiptap-editor/tiptap-editor.scss";
import { useBlog } from "@/src/context/BlogContext";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const { searchedBlogData } = useBlog();
  const blogType = searchParams.get("type") || "html";

  useEffect(() => {
    getBlogByContentType(blogType.toLowerCase()).then((res) =>
      setBlogs(res || [])
    );
  }, [blogType]);

  useEffect(() => {
    if (!contentRef.current) return;

    const highlightCode = () => {
      document.querySelectorAll("pre code").forEach((block) => {
        if (!block.classList.contains("hljs")) {
          hljs.highlightElement(block as HTMLElement);
        }
      });

      document.querySelectorAll("pre").forEach((pre) => {
        if (pre.querySelector(".copy-btn")) return;
        const btn = document.createElement("button");
        btn.innerText = "Copy";
        btn.className =
          "copy-btn absolute top-2 right-2 !bg-[#fff] !text-black text-xs px-2 py-1 rounded z-10 hover:bg-gray-800 transition";
        btn.onclick = () => {
          const code = pre.querySelector("code")?.innerText || "";
          navigator.clipboard.writeText(code);
          btn.innerText = "Copied!";
          setTimeout(() => (btn.innerText = "Copy"), 1000);
        };
        pre.style.position = "relative";
        pre.appendChild(btn);
      });
    };

    requestIdleCallback(highlightCode);

    const observer = new MutationObserver(() => {
      requestIdleCallback(highlightCode);
    });

    observer.observe(contentRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [blogs]);

  return (
    <section className="py-4 lg:w-[70%] lg:mx-auto" ref={contentRef}>
      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        {(searchedBlogData?.length > 0 ? searchedBlogData : blogs)?.map(
          (blog: any, index: number) => (
            <div
              key={blog._id || index}
              className="!break-inside-avoid p-4 bg-[#fff] rounded-2xl"
            >
              <h4 className="text-xl font-bold text-foreground tracking-wide glow-effect mb-4">
                {index + 1}. {blog?.heading}
              </h4>

              <div
                className="prose dark:prose-invert max-w-none text-content leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
