"use client";
import { Button } from "@/components/ui/button";
import BlogForm from "@/src/components/blog/blog-form";
import CustomImageCropper from "@/src/components/common/custom-image-cropper";
import { useBlog } from "@/src/context/BlogContext";

import { Pencil, Upload } from "lucide-react";
import React, { useState } from "react";

const ParentComponent: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<any>("");
  const { selectedObject } = useBlog();
  return (
    <div className="container">
      <BlogForm selectedObject={selectedObject} />
    </div>
  );
};

export default ParentComponent;
