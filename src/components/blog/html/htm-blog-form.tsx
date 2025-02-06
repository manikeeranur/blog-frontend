// "use client";
// import React, { useEffect } from "react";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import { useForm, Controller } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { postHtmlBlog, putHtmlBlog } from "@/src/services/HtmlBlogServices";
// import { useBlog } from "@/src/context/BlogContext";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { HtmlBlogType } from "@/src/services/blog.types";

// interface HtmlBlogFormProps {
//   selectedObject: any;
//   handleClose: () => void;
// }
// const HtmlBlogForm = ({ selectedObject, handleClose }: HtmlBlogFormProps) => {
//   const { fetchBlog } = useBlog();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     resolver: yupResolver(
//       Yup.object().shape({
//         menuName: Yup.string().required("Side Menu Name is required"),
//         heading: Yup.string().required("Heading is required"),
//         content: Yup.string()
//           .min(10, "Content must be at least 10 characters")
//           .required("Content is required"),
//         example: Yup.string().required("Example is required"),
//       })
//     ),
//     defaultValues: {
//       menuName: "",
//       heading: "",
//       content: "",
//       example: "",
//     },
//   });

//   useEffect(() => {
//     if (selectedObject) {
//       setValue("menuName", selectedObject.menuName || "");
//       setValue("heading", selectedObject.heading || "");
//       setValue("content", selectedObject.content || "");
//       setValue("example", selectedObject.example || "");
//     }
//   }, [selectedObject, setValue]); // ✅ Add setValue as a dependency

//   const onSubmit = async (data: HtmlBlogType) => {
//     try {
//       if (selectedObject?._id) {
//         // ✅ If selectedObject exists, update the blog
//         await putHtmlBlog(selectedObject._id, data);
//       } else {
//         // ✅ If no selectedObject, create a new blog
//         await postHtmlBlog(data);
//       }

//       // ✅ Reset form after submission
//       setValue("menuName", "");
//       setValue("heading", "");
//       setValue("content", "");
//       setValue("example", "");
//       handleClose();
//       fetchBlog();
//     } catch (error) {
//       console.error("Error submitting data", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
//       <div className="mb-3">
//         <label>Side Menu Name:</label>
//         <Controller
//           name="menuName"
//           control={control}
//           render={({ field }) => (
//             <Input
//               className="border focus-visible:ring-0 shadow-none"
//               {...field}
//             />
//           )}
//         />
//         {errors.menuName && (
//           <p className="text-danger">{errors.menuName.message}</p>
//         )}
//       </div>

//       <div className="mb-3">
//         <label>Heading:</label>
//         <Controller
//           name="heading"
//           control={control}
//           render={({ field }) => (
//             <Input
//               className="border focus-visible:ring-0 shadow-none"
//               {...field}
//             />
//           )}
//         />
//         {errors.heading && (
//           <p className="text-danger">{errors.heading.message}</p>
//         )}
//       </div>

//       <div className="mb-3">
//         <label>Content:</label>
//         <Controller
//           name="content"
//           control={control}
//           render={({ field }) => (
//             <ReactQuill {...field} theme="snow" onChange={field.onChange} />
//           )}
//         />
//         {errors.content && (
//           <p className="text-danger">{errors.content.message}</p>
//         )}
//       </div>

//       <div className="mb-3">
//         <label>Example:</label>
//         <Controller
//           name="example"
//           control={control}
//           render={({ field }) => (
//             <ReactQuill {...field} theme="snow" onChange={field.onChange} />
//           )}
//         />
//         {errors.example && (
//           <p className="text-danger">{errors.example.message}</p>
//         )}
//       </div>

//       <Button type="submit">{selectedObject ? "Update" : "Add"}</Button>
//     </form>
//   );
// };

// export default HtmlBlogForm;

"use client";
import React, { useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postHtmlBlog, putHtmlBlog } from "@/src/services/HtmlBlogServices";
import { useBlog } from "@/src/context/BlogContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    if (selectedObject) {
      setValue("menuName", selectedObject.menuName || "");
      setValue("heading", selectedObject.heading || "");
      setValue("content", selectedObject.content || "");
      setValue("example", selectedObject.example || "");
    }
  }, [selectedObject, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (selectedObject?._id) {
        await putHtmlBlog(selectedObject._id, data);
      } else {
        await postHtmlBlog(data);
      }
      setValue("menuName", "");
      setValue("heading", "");
      setValue("content", "");
      setValue("example", "");
      handleClose();
      fetchBlog();
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
    [{ table: true }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "list",
    "link",
    "image",
    "table",
  ];

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
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={field.onChange}
            />
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
            <ReactQuill
              {...field}
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={field.onChange}
            />
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
