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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        contentType: Yup.string().required("Content Type is required"),
        menuName: Yup.string().required("Side Menu Name is required"),
        heading: Yup.string().required("Heading is required"),
        content: Yup.string()
          .min(10, "Content must be at least 10 characters")
          .required("Content is required"),
        example: Yup.string().required("Example is required"),
      })
    ),
    defaultValues: {
      contentType: "",
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
        contentType: selectedObject.contentType || "",
        menuName: selectedObject.menuName || "",
        heading: selectedObject.heading || "",
        content: selectedObject.content || "",
        example: selectedObject.example || "",
      });
      // setValue("content", selectedObject.content || "");
      // setValue("example", selectedObject.example || "");
      // setValue("contentType", selectedObject.contentType);
      setTimeout(() => {
        setValue("contentType", selectedObject.contentType || ""); // ✅ Ensure contentType updates after reset
      }, 0);
    }
  }, [selectedObject, reset]);

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
        <label>Content Type:</label>
        {/* <Controller
          name="contentType"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value); // ✅ Update form state
              }}
              value={field.value} // ✅ Ensure default value is set
            >
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select Content Type" />
              </SelectTrigger>
              <SelectContent
                className="tw-z-[1301]"
                side="bottom"
                align="start"
              >
                <SelectGroup>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="Bootstrap">Bootatrap</SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="ReactJs">ReactJs</SelectItem>
                  <SelectItem value="SQL">SQL</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        /> */}
        <Controller
          name="contentType"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value || ""} // ✅ Ensures value updates correctly
            >
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select Content Type" />
              </SelectTrigger>
              <SelectContent
                className="tw-z-[1301]"
                side="bottom"
                align="start"
              >
                <SelectGroup>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="Bootstrap">Bootstrap</SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="ReactJs">ReactJs</SelectItem>
                  <SelectItem value="SQL">SQL</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        {errors.contentType && (
          <p className="text-red-500">{errors.contentType.message}</p>
        )}
      </div>
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
          <p className="text-red-500">{errors.menuName.message}</p>
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
          <p className="text-red-500">{errors.heading.message}</p>
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
          <p className="text-red-500">{errors.content.message}</p>
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
          <p className="text-red-500">{errors.example.message}</p>
        )}
      </div>

      <Button type="submit">{selectedObject ? "Update" : "Add"}</Button>
    </form>
  );
};

export default HtmlBlogForm;
