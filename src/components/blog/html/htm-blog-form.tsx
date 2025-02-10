"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postHtmlBlog, putHtmlBlog } from "@/src/services/HtmlBlogServices";
import { useBlog } from "@/src/context/BlogContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/src/components/tiptap-editor/index";
import "highlight.js/styles/atom-one-dark.css";

interface HtmlBlogFormProps {
  selectedObject: any;
  handleClose: () => void;
}

const HtmlBlogForm = ({ selectedObject, handleClose }: HtmlBlogFormProps) => {
  const { fetchBlog } = useBlog();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        menuName: Yup.string().required("Side Menu Name is required"),
        heading: Yup.string().required("Heading is required"),
        content: Yup.string()
          .min(10, "Content must be at least 10 characters")
          .required("Content is required"),
        example: Yup.string().required("Example is required"),
      })
    ),
    defaultValues: {
      menuName: "",
      heading: "",
      content: "",
      example: "",
    },
  });

  useEffect(() => {
    console.log("Selected Object:", selectedObject);

    if (selectedObject) {
      reset({
        menuName: selectedObject.menuName || "",
        heading: selectedObject.heading || "",
        content: selectedObject.content || "",
        example: selectedObject.example || "",
      });
      setValue("content", selectedObject.content || "");
      setValue("example", selectedObject.example || "");
    }
  }, [selectedObject, reset, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (selectedObject?._id) {
        await putHtmlBlog(selectedObject._id, data);
      } else {
        await postHtmlBlog(data);
      }
      reset();
      handleClose();
      fetchBlog();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-3">
        <label>Side Menu Name:</label>
        <Controller
          name="menuName"
          control={control}
          render={({ field }) => (
            <Input
              className="border focus-visible:ring-0 shadow-none"
              {...field}
            />
          )}
        />
        {errors.menuName && (
          <p className="text-danger">{errors.menuName.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>Heading:</label>
        <Controller
          name="heading"
          control={control}
          render={({ field }) => (
            <Input
              className="border focus-visible:ring-0 shadow-none"
              {...field}
            />
          )}
        />
        {errors.heading && (
          <p className="text-danger">{errors.heading.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>Content:</label>
        {/* ✅ Use Controller to properly integrate TiptapEditor */}
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TiptapEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>Example:</label>
        <Controller
          name="example"
          control={control}
          render={({ field }) => (
            <TiptapEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.example && (
          <p className="text-danger">{errors.example.message}</p>
        )}
      </div>

      <Button type="submit">{selectedObject ? "Update" : "Add"}</Button>
    </form>
  );
};

export default HtmlBlogForm;
