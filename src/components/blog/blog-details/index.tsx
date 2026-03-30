"use client";

import React, { useEffect, useState, useRef } from "react";
import { getBlogByContentType } from "@/src/services/BlogServices";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "@/src/components/tiptap-editor/tiptap-editor.scss";
import { useBlog } from "@/src/context/BlogContext";
import { BookOpen, Lightbulb } from "lucide-react";

// ─── Content-type visual config ──────────────────────────────────────────────
const typeStyle: Record<
  string,
  { border: string; badge: string; exampleBg: string; label: string }
> = {
  html: {
    border: "border-l-orange-400",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    exampleBg: "bg-orange-50 dark:bg-orange-950/20",
    label: "HTML",
  },
  css: {
    border: "border-l-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    exampleBg: "bg-blue-50 dark:bg-blue-950/20",
    label: "CSS",
  },
  javascript: {
    border: "border-l-yellow-400",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    exampleBg: "bg-yellow-50 dark:bg-yellow-950/20",
    label: "JS",
  },
  reactjs: {
    border: "border-l-cyan-500",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    exampleBg: "bg-cyan-50 dark:bg-cyan-950/20",
    label: "React",
  },
  fe_interview: {
    border: "border-l-violet-500",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    exampleBg: "bg-violet-50 dark:bg-violet-950/20",
    label: "Interview",
  },
  sql: {
    border: "border-l-green-500",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    exampleBg: "bg-green-50 dark:bg-green-950/20",
    label: "SQL",
  },
  java: {
    border: "border-l-red-500",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    exampleBg: "bg-red-50 dark:bg-red-950/20",
    label: "Java",
  },
  bootstrap: {
    border: "border-l-indigo-500",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    exampleBg: "bg-indigo-50 dark:bg-indigo-950/20",
    label: "Bootstrap",
  },
};

const defaultStyle = typeStyle.html;
const getStyle = (contentType: string) =>
  typeStyle[contentType?.toLowerCase()] ?? defaultStyle;

// ─── SVG icons ────────────────────────────────────────────────────────────────
const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="break-inside-avoid rounded-2xl border border-border/50 bg-card overflow-hidden animate-pulse mb-4">
    <div className="p-4 border-b border-border/40 flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-muted shrink-0" />
      <div className="h-4 bg-muted rounded-full flex-1" />
      <div className="w-12 h-5 bg-muted rounded-full shrink-0" />
    </div>
    <div className="p-4 space-y-2">
      <div className="h-3 bg-muted rounded-full w-full" />
      <div className="h-3 bg-muted rounded-full w-4/5" />
      <div className="h-3 bg-muted rounded-full w-3/5" />
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const BlogDetails = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { searchedBlogData, currentType } = useBlog();
  const blogType = currentType || "html";

  useEffect(() => {
    setBlogs([]);
    setLoading(true);
    getBlogByContentType(blogType.toLowerCase())
      .then((res) => setBlogs(res || []))
      .finally(() => setLoading(false));
  }, [blogType]);

  useEffect(() => {
    if (!contentRef.current) return;

    const highlightCode = () => {
      document.querySelectorAll("pre code:not(.hljs)").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });

      document.querySelectorAll("pre:not(.has-copy-btn)").forEach((pre: any) => {
        const btn = document.createElement("button");
        btn.innerHTML = COPY_ICON;
        btn.title = "Copy code";
        btn.className =
          "copy-btn absolute top-2 right-2 w-7 h-7 flex items-center justify-center " +
          "text-white/70 hover:text-white bg-white/10 hover:bg-white/20 " +
          "border border-white/15 rounded-md z-10 transition-all backdrop-blur-sm";
        btn.onclick = () => {
          const code = pre.querySelector("code")?.innerText || "";
          navigator.clipboard.writeText(code);
          btn.innerHTML = CHECK_ICON;
          setTimeout(() => (btn.innerHTML = COPY_ICON), 1500);
        };
        pre.style.position = "relative";
        pre.classList.add("has-copy-btn");
        pre.appendChild(btn);
      });
    };

    const rafId = requestAnimationFrame(highlightCode);
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.addedNodes.length > 0))
        requestAnimationFrame(highlightCode);
    });
    observer.observe(contentRef.current, { childList: true, subtree: true });
    return () => { observer.disconnect(); cancelAnimationFrame(rafId); };
  }, [blogs]);

  const displayBlogs = searchedBlogData?.length > 0 ? searchedBlogData : blogs;

  return (
    <section
      className={`px-4 py-5 lg:w-[80%] lg:mx-auto ${
        blogType === "fei" ? "ProseMirror interview" : ""
      }`}
      ref={contentRef}
    >
      {loading ? (
        <div className="columns-1 md:columns-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          className={`columns-1 gap-4 ${
            displayBlogs?.length === 1 ? "md:columns-1" : "md:columns-2"
          }`}
        >
          {displayBlogs?.map((blog: any, index: number) => {
            const style = getStyle(blog.contentType);
            const hasExample =
              blog.example &&
              blog.example.trim() !== "" &&
              blog.example !== "<p></p>";

            return (
              <div
                key={blog._id || index}
                className={`break-inside-avoid mb-4 rounded-2xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border-l-4 ${style.border}`}
              >
                {/* ── Header ── */}
                <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <h4 className="flex-1 text-[15px] font-bold text-foreground leading-snug glow-effect">
                    {blog?.heading}
                  </h4>
                  <span
                    className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>

                {/* ── Theory section ── */}
                <div className="px-4 pb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Theory
                    </span>
                  </div>
                  <div
                    className="prose dark:prose-invert max-w-none text-content leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>

                {/* ── Example section ── */}
                {hasExample && (
                  <div className={`px-4 py-3 border-t border-border/40 ${style.exampleBg}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Example
                      </span>
                    </div>
                    <div
                      className="prose dark:prose-invert max-w-none text-content leading-relaxed example"
                      dangerouslySetInnerHTML={{ __html: blog.example }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
