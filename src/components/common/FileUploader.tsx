"use client";
import React, { useState, useRef } from "react";

interface FileUploaderProps {
  fileName?: string;
  setImageUrl: (url: string | undefined) => void;
}

interface UploadedFileData {
  original_filename: string;
  public_id: string;
  secure_url: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileName = "Images",
  setImageUrl,
}) => {
  const [uploadedData, setUploadedData] = useState<UploadedFileData[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cloudName = "duuesjzan";
  const uploadPreset = "ml_default";
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

  const handleFileUpload = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files?.length) {
      console.error("No files selected.");
      return;
    }

    const files = Array.from(fileInputRef.current.files);
    const uploadedResponses: UploadedFileData[] = [];
    const folderName = `${fileName}`;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", folderName);

      // const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const fileNameWithoutExt = `${file.name.replace(
        /\.[^/.]+$/,
        ""
      )}_${Date.now()}`;

      formData.append("public_id", fileNameWithoutExt);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data: UploadedFileData = await response.json();
        uploadedResponses.push(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    // ✅ Append new uploads to existing images
    setUploadedData((prev) => [...prev, ...uploadedResponses]);

    // ✅ Show all images by setting multiple URLs
    if (uploadedResponses.length > 0) {
      setImageUrl(uploadedResponses.map((file) => file.secure_url).join(","));
    }
  };

  return (
    <div className="col-12">
      <div className="d-flex align-items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          className="form-control"
          multiple
          accept="image/*"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </div>

      <div id="data">
        {uploadedData.length > 0 && (
          <div className="mt-3">
            <p>
              Uploaded File:{" "}
              {uploadedData[uploadedData.length - 1].original_filename}
            </p>
            <p>
              Custom Name: {uploadedData[uploadedData.length - 1].public_id}
            </p>
            <img
              src={uploadedData[uploadedData.length - 1].secure_url}
              alt={uploadedData[uploadedData.length - 1].original_filename}
              width="200"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
