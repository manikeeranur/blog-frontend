// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import { useBlog } from "@/src/context/BlogContext";
// import "react-quill-new/dist/quill.snow.css";
// import { SidebarInset } from "@/components/ui/sidebar";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Loader, Pencil, Trash2 } from "lucide-react";
// import CustomModal from "@/src/components/common/custom-modal";
// import BlogForm from "@/src/components/blog/blog-form";
// import { deleteBlog } from "@/src/services/BlogServices";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
// import "@/src/components/tiptap-editor/tiptap-editor.scss";
// import DateFormatter from "@/src/components/common/date-formatter";

// const Element = dynamic(
//   () => import("react-scroll").then((mod) => mod.Element),
//   {
//     ssr: false,
//   }
// );

// const Blog = () => {
//   const [open, setOpen] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [selectedObject, setSelectedObject] = useState<any>(null);
//   const pathName = usePathname();
//   const { blogData, loading, error, fetchBlog } = useBlog();
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!contentRef.current) return;

//     const highlightCode = () => {
//       document.querySelectorAll("pre code").forEach((block) => {
//         if (!block.classList.contains("hljs")) {
//           hljs.highlightElement(block as HTMLElement);
//         }
//       });
//     };

//     highlightCode();

//     const observer = new MutationObserver(() => {
//       highlightCode();
//     });

//     observer.observe(contentRef.current, { childList: true, subtree: true });

//     return () => observer.disconnect();
//   }, [blogData]);

//   const handleClose = () => {
//     setSelectedObject(null);
//     setOpen(false);
//   };

//   const handleDeleteBlog = async () => {
//     if (!selectedObject?._id) return;
//     try {
//       await deleteBlog(selectedObject._id);
//       setDeleteModal(false);
//       setSelectedObject(null);
//       await fetchBlog(); // ✅ Fetch updated blog list
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="h-[calc(100vh-100px)] flex justify-center items-center">
//         <Button>
//           <Loader className="animate-spin size-[150px]" />
//           Loading ...
//         </Button>
//       </div>
//     );

//   if (error) return <p>{error}</p>;

//   return (
//     <SidebarInset>
//       <div id="html-blog" className="tiptap p-4 md:p-8" ref={contentRef}>
//         {pathName.includes("/blog") && (
//           <Button
//             onClick={() => setOpen(true)}
//             className="mb-5 bg-foreground text-background"
//           >
//             Add Blog
//           </Button>
//         )}

//         {blogData?.map((item: any, index: number) => (
//           <Element name={item?.menuName.replace(/\s+/g, "-")} key={index}>
//             <div>
//               <div className="flex items-center justify-between bg-background sticky top-[62px]">
//                 <h4 className="mb-3 text-foreground font-bold tracking-wide glow-effect">
//                   <strong>{item?.heading}</strong>
//                 </h4>

//                 {pathName.includes("/blog") && (
//                   <div className="flex gap-3">
//                     <Button
//                       size="icon"
//                       onClick={() => {
//                         setOpen(true);
//                         setSelectedObject(item);
//                       }}
//                       className="bg-blue-700 hover:bg-blue-900"
//                     >
//                       <Pencil />
//                     </Button>
//                     <Button
//                       size="icon"
//                       onClick={() => {
//                         setDeleteModal(true);
//                         setSelectedObject(item);
//                       }}
//                       className="bg-red-600 hover:bg-red-900"
//                     >
//                       <Trash2 />
//                     </Button>
//                   </div>
//                 )}
//               </div>
//               <div
//                 className="mb-3 content text-content"
//                 dangerouslySetInnerHTML={{ __html: item?.content }}
//               />
//               <div
//                 className="mb-5 example text-content"
//                 dangerouslySetInnerHTML={{ __html: item?.example }}
//               />
//               {/* <small>
//                 Updated Time : <DateFormatter dateString={item.updatedAt} />
//               </small> */}
//               <div className="my-8">
//                 <hr />
//               </div>
//             </div>
//           </Element>
//         ))}

//         {/* Add / Edit Blog Modal */}
//         <CustomModal
//           headerText={selectedObject ? "Edit Blog" : "Add Blog"}
//           open={open}
//           setOpen={setOpen}
//           handleClose={handleClose}
//         >
//           <BlogForm selectedObject={selectedObject} handleClose={handleClose} />
//         </CustomModal>

//         {/* Delete Blog Confirmation Modal */}
//         <CustomModal
//           headerText="Delete Blog"
//           className="w-1/4"
//           open={deleteModal}
//           setOpen={setDeleteModal}
//           handleClose={() => {
//             setDeleteModal(false);
//             setSelectedObject(null);
//           }}
//           footerComponent={
//             <div className="text-end">
//               <Button
//                 onClick={handleDeleteBlog}
//                 className="bg-red-600 hover:bg-red-900"
//               >
//                 Delete
//               </Button>
//             </div>
//           }
//         >
//           Are you sure you want to delete this blog?
//           <div className="text-red-500 mt-2">{selectedObject?.heading}</div>
//         </CustomModal>
//       </div>
//     </SidebarInset>
//   );
// };

// export default Blog;

"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useBlog } from "@/src/context/BlogContext";
import "react-quill-new/dist/quill.snow.css";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader, Pencil, Trash2 } from "lucide-react";
import CustomModal from "@/src/components/common/custom-modal";
import BlogForm from "@/src/components/blog/blog-form";
import { deleteBlog } from "@/src/services/BlogServices";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "@/src/components/tiptap-editor/tiptap-editor.scss";
import DateFormatter from "@/src/components/common/date-formatter";

const Element = dynamic(
  () => import("react-scroll").then((mod) => mod.Element),
  {
    ssr: false,
  }
);

interface BlogItem {
  _id: string;
  menuName: string;
  heading: string;
  content: string;
  example: string;
  updatedAt: string;
}

const Blog: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedObject, setSelectedObject] = useState<BlogItem | null>(null);
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

    requestIdleCallback(highlightCode);

    const observer = new MutationObserver(() => {
      requestIdleCallback(highlightCode);
    });

    observer.observe(contentRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [blogData]);

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
      await fetchBlog(); // ✅ Fetch updated blog list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading)
    return (
      <div className="h-[calc(100vh-100px)] flex justify-center items-center">
        <Button>
          <Loader className="animate-spin size-[50px]" />
          Loading ...
        </Button>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <SidebarInset>
      <div id="html-blog" className="tiptap p-4 md:p-8" ref={contentRef}>
        {pathName.includes("/blog") && (
          <Button
            onClick={() => setOpen(true)}
            className="mb-5 bg-foreground text-background"
          >
            Add Blog
          </Button>
        )}

        {blogData?.map((item: BlogItem, index: number) => (
          <Element name={item?.menuName.replace(/\s+/g, "-")} key={index}>
            <div>
              <div className="flex items-center justify-between bg-background sticky top-[62px]">
                <h4 className="mb-3 text-foreground font-bold tracking-wide glow-effect">
                  <strong>{item?.heading}</strong>
                </h4>

                {pathName.includes("/blog") && (
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      onClick={() => {
                        setOpen(true);
                        setSelectedObject(item);
                      }}
                      className="bg-blue-700 hover:bg-blue-900"
                    >
                      <Pencil />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedObject(item);
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
                dangerouslySetInnerHTML={{ __html: item?.content }}
              />
              <div
                className="mb-5 example text-content"
                dangerouslySetInnerHTML={{ __html: item?.example }}
              />
              <div className="my-8">
                <hr />
              </div>
            </div>
          </Element>
        ))}

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

export default Blog;
