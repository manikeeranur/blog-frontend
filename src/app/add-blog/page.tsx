"use client";
import BlogForm from "@/src/components/blog/blog-form";
import { useBlog } from "@/src/context/BlogContext";
import React, { Suspense, useState } from "react";

const ParentComponent: React.FC = () => {
  const { selectedObject } = useBlog();
  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogForm selectedObject={selectedObject} />
      </Suspense>
    </div>
  );
};

export default ParentComponent;
