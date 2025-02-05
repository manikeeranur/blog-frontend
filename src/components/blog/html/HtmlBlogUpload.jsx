import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Quill formats and modules configuration
const quillFormats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code-block",
  "color",
  "background",
  "list",
  "bullet",
  "ordered",
  "header",
  "align",
  "link",
  "blockquote",
];

const quillModules = {
  toolbar: [
    [{ header: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    ["code-block"],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
  ],
  clipboard: { matchVisual: false },
};

// Form validation schema
const validationSchema = Yup.object().shape({
  menuName: Yup.string().required("Side Menu Name is required"),
  heading: Yup.string().required("Heading is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  example: Yup.string().required("Example is required"),
});

const HtmlBlogUpload = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { menuName: "", heading: "", content: "", example: "" },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitting:", data);
      await axios.post("http://localhost:3001/htmlBlog", data);

      // Reset form fields
      setValue("menuName", "");
      setValue("heading", "");
      setValue("content", "");
      setValue("example", "");
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  // Watch form values for preview
  const menuName = watch("menuName");
  const heading = watch("heading");
  const content = watch("content");
  const example = watch("example");

  return (
    <div
      className="w-100 bg-white overflow-auto p-5"
      style={{ height: `calc(100vh - 63px)` }}
    >
      <h1>Html Blog</h1>
      <div className="row m-0">
        <div className="col-md p-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Side Menu Name Field */}
            <div className="mb-3">
              <label>Side Menu Name:</label>
              <Controller
                name="menuName"
                control={control}
                render={({ field }) => (
                  <input type="text" className="form-control" {...field} />
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
                  <input type="text" className="form-control" {...field} />
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
                    onChange={(value) => field.onChange(value)}
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
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.example && (
                <p className="text-danger">{errors.example.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-sm btn-primary">
              Submit
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="col-md p-3 html-blog">
          <h3>Preview : </h3>
          <div>{menuName}</div>
          <h1 dangerouslySetInnerHTML={{ __html: heading }} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div dangerouslySetInnerHTML={{ __html: example }} />
        </div>
      </div>
    </div>
  );
};

export default HtmlBlogUpload;
