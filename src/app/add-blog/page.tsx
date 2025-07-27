"use client";
import BlogForm from "@/src/components/blog/blog-form";
import { useBlog } from "@/src/context/BlogContext";
import React, { useState } from "react";

const ParentComponent: React.FC = () => {

  const { selectedObject } = useBlog();
  return (
    <div className="container">
      <BlogForm selectedObject={selectedObject} />
    </div>
  );
};

export default ParentComponent;
