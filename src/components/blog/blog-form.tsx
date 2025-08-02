"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBlogById, postBlog, putBlog } from "@/src/services/BlogServices";
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
import { useRouter, useSearchParams } from "next/navigation";

interface BlogFormProps {
  selectedObject?: any;
  handleClose?: any;
}

const BlogForm = ({ selectedObject, handleClose }: BlogFormProps) => {
  const searchParams = useSearchParams();
  const parems_id = searchParams.get("id");
  const router = useRouter();
  const { fetchBlog, setSelectedObject } = useBlog();

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
        example: Yup.string(),
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

  const getEditedBlogDetails = async () => {
    try {
      const res = await getBlogById(parems_id);
      console.log("res_id", res);
      setSelectedObject(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchAndSetBlog = async () => {
      if (parems_id) {
        try {
          const res: any = await getBlogById(parems_id);
          setSelectedObject(res); // update context
          reset({
            contentType: res.contentType || "",
            menuName: res.menuName || "",
            heading: res.heading || "",
            content: res.content || "",
            example: res.example || "",
          });
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };

    fetchAndSetBlog();
  }, [parems_id, reset, setSelectedObject]);

  const onSubmit = async (data: any) => {
    try {
      if (selectedObject?._id) {
        await putBlog(selectedObject._id, data);
      } else {
        await postBlog(data);
      }
      reset();
      // handleClose();
      router.push("/blog");
      setSelectedObject(null);
      fetchBlog();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full !p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="mb-3">
          <label className="font-bold">Content Type:</label>
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
                <SelectTrigger
                  id="framework"
                  className="border focus:ring-0 focus:border focus:outline-none !shadow-none"
                >
                  <SelectValue placeholder="Select Content Type" />
                </SelectTrigger>
                <SelectContent
                  className="tw-z-[1301]"
                  side="bottom"
                  align="start"
                >
                  <SelectGroup>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="HTML"
                    >
                      HTML
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="CSS"
                    >
                      CSS
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="Bootstrap"
                    >
                      Bootstrap
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="Javascript"
                    >
                      Javascript
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="ReactJs"
                    >
                      ReactJs
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="SQL"
                    >
                      SQL
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="Java"
                    >
                      Java
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-[#f3f3f3]"
                      value="FE_Interview"
                    >
                      Frontend Interview
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.contentType && (
            <p className="text-red-500 text-[12px]">
              {errors.contentType.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label className="font-bold">Side Menu Name:</label>
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
            <p className="text-red-500 text-[12px]">
              {errors.menuName.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label className="font-bold">Heading:</label>
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
          <p className="text-red-500 text-[12px]">{errors.heading.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="font-bold">Content:</label>
        {/* ✅ Use Controller to properly integrate TiptapEditor */}
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TiptapEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-red-500 text-[12px]">{errors.content.message}</p>
        )}
      </div>

      <div className="mb-3 hidden">
        <label className="font-bold">Example:</label>
        <Controller
          name="example"
          control={control}
          render={({ field }) => (
            <TiptapEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.example && (
          <p className="text-red-500 text-[12px]">{errors.example.message}</p>
        )}
      </div>
      <Button type="submit">{selectedObject ? "Update" : "Add"}</Button>
    </form>
  );
};

export default BlogForm;
