"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getBlog } from "@/src/services/BlogServices";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlog();
      setBlogData(data);
    } catch (error) {
      setError("Error fetching blog: " + error.message);
      console.error("Error fetching blog:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, loading, error, fetchBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(BlogContext);
};
