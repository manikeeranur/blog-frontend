"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useBlog } from "@/src/context/BlogContext";
import "react-quill-new/dist/quill.snow.css";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Loader,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CustomModal from "@/src/components/common/custom-modal";
import BlogForm from "@/src/components/blog/blog-form";
import { deleteBlog } from "@/src/services/BlogServices";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "@/src/components/tiptap-editor/tiptap-editor.scss";

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  {
    ssr: false,
  }
);

const JsPage = () => {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathName = usePathname();
  const { blogData, loading, error, fetchBlog } = useBlog();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const highlightCode = () => {
      document.querySelectorAll("pre code").forEach((block) => {
        if (!block.classList.contains("hljs")) {
          hljs.highlightElement(block as HTMLElement);
        }
      });
    };

    highlightCode();

    const observer = new MutationObserver(() => {
      highlightCode();
    });

    observer.observe(contentRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [blogData]);

  // Load last viewed topic from localStorage
  useEffect(() => {
    const savedIndex = localStorage.getItem("jsBlogIndex");
    if (savedIndex !== null) {
      setCurrentIndex(parseInt(savedIndex, 10));
    }
  }, []);

  // Save currentIndex whenever it changes
  useEffect(() => {
    localStorage.setItem("jsBlogIndex", currentIndex.toString());
  }, [currentIndex]);

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleDeleteBlog = async () => {
    if (!selectedObject?._id) return;
    try {
      await deleteBlog(selectedObject._id);
      setDeleteModal(false);
      setSelectedObject(null);
      await fetchBlog();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Filter JavaScript-related blogs
  const jsBlogs =
    blogData?.filter((item: any) => item.contentType === "Javascript") || [];
  const totalBlogs = jsBlogs.length;
  const currentBlog = jsBlogs[currentIndex];

  const handleNext = () => {
    if (currentIndex < totalBlogs - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (loading)
    return (
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <Button>
          <Loader className="animate-spin size-[150px]" />
          Loading ...
        </Button>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <SidebarInset>
      <div id="js-blog" className="tiptap p-4 md:px-8 md:py-0" ref={contentRef}>
        {currentBlog && (
          <Element
            name={currentBlog?.menuName.replace(/\s+/g, "-")}
            key={currentBlog?._id}
          >
            <div>
              <div className="flex items-center justify-between bg-background sticky top-[62px]">
                <h4 className="mb-3 text-foreground font-bold tracking-wide glow-effect">
                  <strong>{currentBlog?.heading}</strong>
                </h4>

                {pathName.includes("/blog") && (
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      onClick={() => {
                        setOpen(true);
                        setSelectedObject(currentBlog);
                      }}
                      className="bg-blue-700 hover:bg-blue-900"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedObject(currentBlog);
                      }}
                      className="bg-red-600 hover:bg-red-900"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                )}
              </div>
              <div
                className="mb-3 content text-content"
                dangerouslySetInnerHTML={{ __html: currentBlog?.content }}
              />
              <div
                className="mb-5 example text-content"
                dangerouslySetInnerHTML={{ __html: currentBlog?.example }}
              />
            </div>
          </Element>
        )}

        {/* Navigation Controls */}
        {totalBlogs > 1 && (
          <div className="flex justify-end items-center gap-4 p-5 sticky bottom-0 left-0 w-full bg-background">
            <Button
              size="sm"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              //   className="bg-gray-600 hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <small className="w-[100px] text-center">
              Topic {currentIndex + 1} of {totalBlogs}
            </small>
            <Button
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === totalBlogs - 1}
              //   className="bg-gray-600 hover:bg-gray-800 disabled:opacity-50"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}

        {/* Add / Edit Blog Modal */}
        <CustomModal
          headerText={selectedObject ? "Edit Blog" : "Add Blog"}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        >
          <BlogForm selectedObject={selectedObject} handleClose={handleClose} />
        </CustomModal>

        {/* Delete Blog Confirmation Modal */}
        <CustomModal
          headerText="Delete Blog"
          className="w-1/4"
          open={deleteModal}
          setOpen={setDeleteModal}
          handleClose={() => {
            setDeleteModal(false);
            setSelectedObject(null);
          }}
          footerComponent={
            <div className="text-end">
              <Button
                onClick={handleDeleteBlog}
                className="bg-red-600 hover:bg-red-900"
              >
                Delete
              </Button>
            </div>
          }
        >
          Are you sure you want to delete this blog?
          <div className="text-red-500 mt-2">{selectedObject?.heading}</div>
        </CustomModal>
      </div>
    </SidebarInset>
  );
};

export default JsPage;
