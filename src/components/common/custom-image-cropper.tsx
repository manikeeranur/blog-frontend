"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import "./image-cropper/style.scss";
import CustomModal from "./custom-modal";
import ImageCropper from "./image-cropper";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";

export interface ImageCropperRef {
  openModal: () => void;
  closeModal: () => void;
}

interface CustomImageCropperProps {
  value?: string;
  onChange?: (imageUrl: string) => void;
  onBlur?: () => void;
  name?: string;
  modalTitle?: string;
  addButtonText?: string;
  editButtonText?: string;
  defaultImage?: string;
  fileSizeInBytes?: number;
  formDataCategory?: string;
  label?: string;
  aspectRatio?: number;
  cropShape?: "round" | "rect";
  objectFit?: "contain" | "cover";
  isRemoveImageButton?: boolean;
  buttonComponent?: React.ReactNode;
  editButtonComponent?: React.ReactNode;
  editButtonPosition?:
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  previewComponent?: (imageUrl: string) => React.ReactNode;
  uploaderDesign?: React.ReactNode;
  clickablePreview?: boolean;
  PreviewImageClass?: string;
  isDraggable?: boolean;
}

const CustomImageCropper = forwardRef<ImageCropperRef, CustomImageCropperProps>(
  (
    {
      value = "",
      onChange,
      onBlur,
      name,
      modalTitle = "Image Upload",
      addButtonText = "Add Image",
      editButtonText = "Edit Image",
      defaultImage = "",
      fileSizeInBytes = 2 * 1024 * 1024,
      formDataCategory = "user_uploads", // ✅ fixed from "events"
      label = "Image",
      aspectRatio = 1,
      cropShape = "rect",
      objectFit = "contain",
      isRemoveImageButton = false,
      buttonComponent,
      editButtonComponent,
      editButtonPosition = "bottom right",
      previewComponent,
      uploaderDesign,
      clickablePreview = true,
      PreviewImageClass,
      isDraggable = false,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [error, setError] = useState(false);
    const [isSettingImage, setIsSettingImage] = useState(false);
    const [croppedImage, setCroppedImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentImage, setCurrentImage] = useState(value || defaultImage);
    const [hasUploadedFile, setHasUploadedFile] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal: () => setOpen(true),
      closeModal: () => handleCropClose(),
    }));

    const getEditButtonPositionClass = (pos?: string) => {
      switch (pos) {
        case "top left":
          return "absolute top-2 left-2";
        case "top right":
          return "absolute top-2 right-2";
        case "bottom left":
          return "absolute bottom-2 left-2";
        case "bottom right":
          return "absolute bottom-2 right-2";
        default:
          return "";
      }
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
      const file = e?.target?.files?.[0] || e?.dataTransfer?.files?.[0];
      if (!file) return;

      if (file.size <= fileSizeInBytes) {
        const blob = URL.createObjectURL(file);
        setImage(blob);
        setError(false);
        setHasUploadedFile(true);
        setOpen(true);
      } else {
        setError(true);
      }

      if (e?.target?.value !== undefined) {
        e.target.value = "";
      }
    };

    const uploadImage = async (blobUrl: string) => {
      try {
        setIsSubmitting(true);

        // Step 1: Fetch blob from the URL
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        // Step 2: Validate blob MIME type
        if (!blob.type.startsWith("image/")) {
          throw new Error("Invalid file type. Must be an image.");
        }

        // Step 3: Create a valid File object from Blob with proper extension
        const fileExt = blob.type.split("/")[1] || "jpeg";
        const fileName = `cropped_${Date.now()}.${fileExt}`;
        const file = new File([blob], fileName, {
          type: blob.type,
        });

        // Step 4: Prepare FormData for Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        formData.append("folder", formDataCategory); // Use the prop instead of hardcoded value
        formData.append("public_id", fileName.replace(/\.[^/.]+$/, "")); // Remove extension for public_id
        formData.append("timestamp", (Date.now() / 1000).toString());

        // Step 5: Upload to Cloudinary
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/duuesjzan/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          const errText = await uploadResponse.text();
          throw new Error(
            `Upload failed: ${uploadResponse.status} - ${errText}`
          );
        }

        // Step 6: Extract image URL
        const data = await uploadResponse.json();
        const imageUrl = data.secure_url;

        setCurrentImage(imageUrl);
        onChange?.(imageUrl);
        onBlur?.();
        setOpen(false);

        return imageUrl;
      } catch (error) {
        console.log("Cloudinary Upload Error:", error);
        throw error;
      } finally {
        setIsSubmitting(false);
        setHasUploadedFile(false);
      }
    };

    const handleApply = async () => {
      if (!croppedImage) return;
      await uploadImage(croppedImage);
    };

    const loadImage = async (imageUrl: string) => {
      try {
        setIsSettingImage(true);
        await fetch(
          imageUrl.startsWith("https://") ? imageUrl : `https://${imageUrl}`
        )
          .then((res) => res.blob())
          .then((res) => setImage(URL.createObjectURL(res)));
      } catch (error) {
        console.log("Image load error:", error);
      } finally {
        setIsSettingImage(false);
      }
    };

    const handleDeleteImage = () => {
      setImage("");
      setCroppedImage("");
      setCurrentImage("");
      onChange?.("");
      onBlur?.();
    };

    const handleCropClose = () => {
      setOpen(false);
      setImage("");
      setCroppedImage("");
      setHasUploadedFile(false);
    };

    useEffect(() => {
      const errorTimeout = setTimeout(() => setError(false), 3000);
      return () => clearTimeout(errorTimeout);
    }, [error]);

    useEffect(() => {
      setCurrentImage(value || defaultImage);
    }, [value, defaultImage]);

    useEffect(() => {
      if (open && currentImage && !hasUploadedFile) {
        loadImage(currentImage);
      }
    }, [open, currentImage, hasUploadedFile]);

    const defaultPreview = (imgUrl: string) => (
      <div
        className="image-preview relative"
        onClick={clickablePreview ? () => setOpen(true) : undefined}
        style={{ cursor: clickablePreview ? "pointer" : "default" }}
      >
        {imgUrl ? (
          <img src={imgUrl} alt="Preview" className={PreviewImageClass} />
        ) : (
          <img
            src={`https://cdn.impacteers-club.com/images/main/no-image.png`}
            alt="Preview"
            width={120}
            height={120}
            className="img-thumbnail"
            style={{ objectFit: "cover" }}
          />
        )}
        {(!uploaderDesign || currentImage) &&
          (buttonComponent ? (
            <div onClick={() => setOpen(true)}>{buttonComponent}</div>
          ) : currentImage && editButtonComponent ? (
            <div
              onClick={() => setOpen(true)}
              className={getEditButtonPositionClass(editButtonPosition)}
            >
              {editButtonComponent}
            </div>
          ) : (
            defaultButton
          ))}
      </div>
    );

    const defaultButton = (
      <button
        type="button"
        className={`btn ${
          currentImage ? "btn-outline-primary" : "btn-primary"
        }`}
        onClick={() => setOpen(true)}
      >
        {currentImage ? editButtonText : addButtonText}
      </button>
    );

    const renderUploaderDesign = () => {
      if (uploaderDesign) {
        return (
          <div onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
            {uploaderDesign}
          </div>
        );
      }
      return null;
    };

    return (
      <div
        className={`custom-image-cropper relative min-h-[150px] ${
          isDraggable ? "is-draggable" : ""
        }`}
        onDragOver={(e) => {
          if (isDraggable) {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }
        }}
        onDrop={(e) => {
          if (isDraggable) {
            e.preventDefault();
            handleFile(e);
          }
        }}
      >
        {!currentImage && renderUploaderDesign()}

        {(!uploaderDesign || currentImage) &&
          (previewComponent
            ? previewComponent(currentImage)
            : defaultPreview(currentImage))}

        <input
          id={`${name || "image"}_uploader`}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={handleFile}
        />

        <CustomModal
          open={open}
          setOpen={setOpen}
          className="w-[50%]"
          headerComponent={
            <div className="w-full flex justify-between">
              <div>
                {currentImage ? "Edit" : "Add"} {name}
              </div>
              <XCircleIcon onClick={() => setOpen(false)} />{" "}
            </div>
          }
          footerComponent={
            <div>
              {!isSettingImage && (
                <div className="w-full space-x-2">
                  {image && isRemoveImageButton && (
                    <Button
                      size={"sm"}
                      onClick={handleDeleteImage}
                      variant={"destructive"}
                    >
                      Remove Image
                    </Button>
                  )}
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={handleCropClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    size={"sm"}
                    onClick={handleApply}
                    disabled={isSubmitting || !image}
                  >
                    {isSubmitting ? "Applying..." : "Apply"}
                  </Button>
                </div>
              )}
            </div>
          }
        >
          <div>
            <div className="image-upload-modal">
              {isSettingImage ? (
                <div className="text-center pt-3">
                  <div
                    className="spinner-border spinner-border-sm text-success"
                    role="status"
                  />
                </div>
              ) : (
                <div className="react-body-content">
                  <div className="cover_cropper_wrapper">
                    <ImageCropper
                      image={image}
                      setCroppedImage={setCroppedImage}
                      aspectRatio={aspectRatio}
                      cropShape={cropShape}
                      objectFit={objectFit}
                      FallbackUI={
                        <div className="profile_fallback">
                          <img
                            src={`https://cdn.impacteers-club.com/images/main/no-image.png`}
                            height={100}
                            width={100}
                            alt="image"
                          />
                        </div>
                      }
                    />
                  </div>
                  <div className="text-center">
                    <label
                      className={`btn btn-outline-secondary cursor-pointer ${
                        !image ? "mt-3" : ""
                      }`}
                      htmlFor={`${name || "image"}_uploader`}
                    >
                      <i className="bi bi-upload me-2"></i>
                      Upload Image
                    </label>
                    {error && (
                      <div className="invalid-field">
                        File size exceeds {fileSizeInBytes / (1024 * 1024)}MB.
                        Please choose a smaller file.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomModal>
      </div>
    );
  }
);

CustomImageCropper.displayName = "CustomImageCropper";
export default CustomImageCropper;
