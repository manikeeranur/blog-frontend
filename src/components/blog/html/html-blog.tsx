"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useBlog } from "@/src/context/BlogContext";
import "react-quill-new/dist/quill.snow.css";
import { SidebarInset } from "@/components/ui/sidebar";
import { HtmlBlogType } from "@/src/services/blog.types";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import CustomModal from "../../common/custom-modal";
import HtmlBlogForm from "./htm-blog-form";
import { deleteHtmlBlog } from "@/src/services/HtmlBlogServices";

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: false }
);

const HtmlBlog = () => {
  const [open, setOpen] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const pathName = usePathname();
  const { blogData, loading, error, fetchBlog } = useBlog();
  const [isClient, setIsClient] = useState(false);
  const [selectedObject, setselectedObject] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = () => {
    setselectedObject(null);
    setOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SidebarInset>
      <div id="html-blog" className="p-4 md:p-8">
        {pathName.includes("/blog") && (
          <Button onClick={() => setOpen(true)} className="mb-5 bg-[#374151]">
            Add Blog
          </Button>
        )}
        {isClient &&
          blogData?.map((item: any, index: number) => (
            <Element name={item?.menuName.replace(/\s+/g, "-")} key={index}>
              <div className="text-gray-500">
                <div className="flex items-center justify-between">
                  <h4 className="mb-3 text-[#374151]">
                    <strong>{item?.heading}</strong>
                  </h4>
                  {pathName.includes("/blog") && (
                    <div className="flex gap-3">
                      <Button
                        size="icon"
                        onClick={() => {
                          setOpen(true);
                          setselectedObject(item);
                        }}
                        className="bg-blue-700 hover:bg-blue-900"
                      >
                        <Pencil />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => {
                          setDeleteBlog(true);
                          setselectedObject(item);
                        }}
                        className="bg-red-600 hover:bg-red-900"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  )}
                </div>
                {isClient && (
                  <>
                    <div
                      className="mb-3 content"
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    />
                    <div
                      className="mb-5 example"
                      dangerouslySetInnerHTML={{ __html: item?.example }}
                    />
                  </>
                )}
              </div>
            </Element>
          ))}
        <CustomModal
          headerText={selectedObject ? "Edit Blog" : "Add Blog"}
          open={open}
          setOpen={setOpen}
          handleClose={() => {
            setOpen(false);
            setselectedObject(null);
          }}
        >
          <HtmlBlogForm
            selectedObject={selectedObject}
            handleClose={handleClose}
          />
        </CustomModal>

        <CustomModal
          headerText="Delete Blog"
          className="w-1/4"
          open={deleteBlog}
          setOpen={setDeleteBlog}
          handleClose={() => {
            setDeleteBlog(false);
            setselectedObject(null);
          }}
          footerComponent={
            <div className="text-end">
              <Button
                onClick={async () => {
                  try {
                    await deleteHtmlBlog(selectedObject?._id);
                    setDeleteBlog(false);
                    setselectedObject(null);
                    await fetchBlog(); // ✅ Fetch updated blog list
                  } catch (error) {
                    console.error("Error deleting blog:", error);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          }
        >
          Are You Sure Delete this Blog
        </CustomModal>
      </div>
    </SidebarInset>
  );
};

export default HtmlBlog;
