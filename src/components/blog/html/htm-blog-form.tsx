"use client";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postHtmlBlog } from "@/src/services/HtmlBlogServices";
import { useBlog } from "@/src/context/BlogContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HtmlBlogType } from "@/src/services/blog.types";

const quillFormats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code-block",
  "color",
  "background",
  "list",
  "header",
  "align",
  "link",
  "blockquote",
  "table",
];

const quillModules = {
  toolbar: [
    // [{ header: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["code-block"],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [],
    [{ table: "table" }],
  ],
  clipboard: { matchVisual: false },
  table: true,
};

const validationSchema = Yup.object().shape({
  menuName: Yup.string().required("Side Menu Name is required"),
  heading: Yup.string().required("Heading is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  example: Yup.string().required("Example is required"),
});

const HtmlBlogForm = () => {
  const { fetchBlog } = useBlog();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { menuName: "", heading: "", content: "", example: "" },
  });

  const onSubmit = async (data: HtmlBlogType) => {
    try {
      await postHtmlBlog(data);
      // if (selectedObject) {
      //   await putHtmlBlog(selectedObject._id, data);
      // } else {
      //   await postHtmlBlog(data);
      // }

      setValue("menuName", "");
      setValue("heading", "");
      setValue("content", "");
      setValue("example", "");
    } catch (error) {
      console.error("Error submitting data", error);
    } finally {
      fetchBlog();
    }
  };

  // useEffect(() => {
  //   if (selectedObject) {
  //     setValue("menuName", selectedObject.menuName);
  //     setValue("heading", selectedObject.heading);
  //     setValue("content", selectedObject.content);
  //     setValue("example", selectedObject.example);
  //   }
  // }, [selectedObject]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        {/* Side Menu Name Field */}
        <div className="mb-3">
          <label>Side Menu Name:</label>
          <Controller
            name="menuName"
            control={control}
            render={({ field }) => (
              <Input
                className="rounded-r-none focus-visible:ring-0"
                type="text"
                {...field}
              />
            )}
          />
          {errors.menuName && (
            <p className="text-danger">{errors.menuName.message}</p>
          )}
        </div>

        {/* Heading Field */}
        <div className="mb-3">
          <label>Heading:</label>
          <Controller
            name="heading"
            control={control}
            render={({ field }) => (
              <Input
                className="rounded-r-none focus-visible:ring-0"
                type="text"
                {...field}
              />
            )}
          />
          {errors.heading && (
            <p className="text-danger">{errors.heading.message}</p>
          )}
        </div>

        {/* Content Field */}
        <div className="mb-3">
          <label>Content:</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                formats={quillFormats}
                modules={quillModules}
                onChange={(value: string) => field.onChange(value)}
              />
            )}
          />
          {errors.content && (
            <p className="text-danger">{errors.content.message}</p>
          )}
        </div>

        {/* Example Field */}
        <div className="mb-3">
          <label>Example:</label>
          <Controller
            name="example"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                formats={quillFormats}
                modules={quillModules}
                onChange={(value: string) => field.onChange(value)}
              />
            )}
          />
          {errors.example && (
            <p className="text-danger">{errors.example.message}</p>
          )}
        </div>

        <Button type="submit">
          {/* {selectedObject ? "Update" : "Add"} */} Add
        </Button>
      </form>
    </>
  );
};

export default HtmlBlogForm;
