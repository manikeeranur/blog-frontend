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

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  { ssr: false }
);

const HtmlBlog = () => {
  const [open, setOpen] = useState(false);
  const searchParems = usePathname();
  const { blogData, loading, error } = useBlog();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SidebarInset>
      <div id="html-blog" className="p-4 md:p-8">
        {searchParems.includes("/blog") && (
          <Button onClick={() => setOpen(true)} className="mb-5">
            Add Blog
          </Button>
        )}
        {isClient &&
          blogData?.map((item: HtmlBlogType, index: number) => (
            <Element name={item?.menuName.replace(/\s+/g, "-")} key={index}>
              <div className="text-gray-500">
                <div className="flex items-center justify-between">
                  <h4 className="mb-3 text-[#374151]">
                    <strong>{item?.heading}</strong>
                  </h4>
                  {searchParems.includes("/blog") && (
                    <div className="flex gap-3">
                      <Button size="icon">
                        <Pencil />
                      </Button>
                      <Button size="icon">
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
        <CustomModal headerText="Add Blog" open={open} setOpen={setOpen}>
          <HtmlBlogForm />
        </CustomModal>
      </div>
    </SidebarInset>
  );
};

export default HtmlBlog;
