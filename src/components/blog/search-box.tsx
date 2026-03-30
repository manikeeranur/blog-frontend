"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/src/context/BlogContext";
import { SearchBlog } from "@/src/services/BlogServices";

const SearchBox = () => {
  const { setSearchedBlogData, currentType } = useBlog();
  const blogType = currentType || "html";

  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query.trim()) {
        setSearchedBlogData(null);
        return;
      }

      try {
        const res = await SearchBlog(
          blogType === "js"
            ? "javascript"
            : blogType === "fei"
            ? "FE_Interview"
            : blogType,
          query.trim()
        );

        setSearchedBlogData(res);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, blogType, setSearchedBlogData]);

  return (
    <Input
      placeholder={`Search ${blogType === "js" ? "javascript" : blogType === "fei" ? "FE Interview" : blogType}`}
      className="focus:!ring-0 ring-0 placeholder:capitalize"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBox;
