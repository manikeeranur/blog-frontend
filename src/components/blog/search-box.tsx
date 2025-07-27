"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/src/context/BlogContext";
import { SearchBlog } from "@/src/services/BlogServices";
import { useSearchParams } from "next/navigation";

const SearchBox = () => {
  const { setSearchedBlogData } = useBlog();
  const searchParams = useSearchParams();
  const blogType = searchParams.get("type") || "html";

  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query.trim()) {
        setSearchedBlogData(null);
        return;
      }

      try {
        const res = await SearchBlog(
          blogType === "js" ? "javascript" : blogType,
          query.trim()
        );
        setSearchedBlogData(res);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [query, blogType, setSearchedBlogData]);

  return (
    <Input
      placeholder={`Search ${blogType === "js" ? "javascript" : blogType}`}
      className="focus:!ring-0 ring-0 placeholder:capitalize"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBox;
