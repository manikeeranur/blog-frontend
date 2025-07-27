"use client";
import { Button } from "@/components/ui/button";

import CustomImageCropper from "@/src/components/common/custom-image-cropper";

import { Pencil, Upload } from "lucide-react";
import React, { useState } from "react";

const ParentComponent: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<any>("");

  return (
    <div className="container">
      <h2>Upload Images</h2>

      <CustomImageCropper
        isDraggable
        value={""}
        name="banner"
        onChange={(url) => console.log("url", url)}
        label="Banner Picture"
        aspectRatio={4 / 2}
        uploaderDesign={
          <div className="border p-5 rounded-2 flex items-center justify-center flex-col">
            <Upload className="size-7" />
            <div className="font-light">Click to upload an banner image</div>
          </div>
        }
        PreviewImageClass={"w-full rounded-2 "}
        editButtonComponent={
          <Button size={"icon"} variant={"ghost"} className="bg-white">
            <Pencil />
          </Button>
        }
        isRemoveImageButton
      />
      {imageUrls && (
        <div className="mt-4">
          <h4>Uploaded Image URLs:</h4>
          {imageUrls.split(",").map(({ url, index }: any) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} width={200} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
