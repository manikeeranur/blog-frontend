// "use client";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
// } from "@/components/ui/sidebar";
// import { useBlog } from "@/src/context/BlogContext";
// import { HtmlBlogType } from "@/src/services/blog.types";
// import { CodeXml, Folder, SquareCode } from "lucide-react";
// import { Link } from "react-scroll";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// export function AppSidebar() {
//   const { blogData } = useBlog();
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-xl text-foreground">
//             Main Menu
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             {/* <SidebarMenu>
//               {blogData?.map((item: HtmlBlogType, index: number) => (
//                 <SidebarMenuItem key={index}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       to={item.menuName.replace(/\s+/g, "-")}
//                       smooth={true}
//                       duration={400}
//                       offset={-80}
//                       className="text-content cursor-pointer hover:no-underline"
//                     >
//                       <Folder /> {item.menuName}
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu> */}

//             <Accordion
//               type="single"
//               collapsible
//               className="max-w-lg my-4 w-full border-none"
//             >
//               <AccordionItem value="HTML">
//                 <AccordionTrigger className="hover:no-underline flex gap-3">
//                   <span>HTML</span>
//                 </AccordionTrigger>
//                 {blogData?.map((item: HtmlBlogType, index: number) => (
//                   <AccordionContent key={index}>
//                     <Link
//                       to={item.menuName.replace(/\s+/g, "-")}
//                       smooth={true}
//                       duration={400}
//                       offset={-80}
//                       className="text-content flex items-center gap-3 font-[400] cursor-pointer hover:no-underline"
//                     >
//                       <CodeXml className="size-[14px]" /> {item.menuName}
//                     </Link>
//                   </AccordionContent>
//                 ))}
//               </AccordionItem>

//               <AccordionItem value="CSS">
//                 <AccordionTrigger className="hover:no-underline flex gap-3">
//                   <span>CSS</span>
//                 </AccordionTrigger>
//                 {blogData?.map((item: HtmlBlogType, index: number) => (
//                   <AccordionContent key={index}>
//                     <Link
//                       to={item.menuName.replace(/\s+/g, "-")}
//                       smooth={true}
//                       duration={400}
//                       offset={-80}
//                       className="text-content flex items-center gap-3 font-[400] active:text-red-500 cursor-pointer hover:no-underline"
//                     >
//                       <CodeXml className="size-[14px]" /> {item.menuName}
//                     </Link>
//                   </AccordionContent>
//                 ))}
//               </AccordionItem>
//             </Accordion>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useBlog } from "@/src/context/BlogContext";
import { HtmlBlogType } from "@/src/services/blog.types";
import { CodeXml, FolderCode, PaintBucket } from "lucide-react";
import { Link } from "react-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AppSidebar() {
  const { blogData } = useBlog();

  return (
    <Sidebar className="w-64 bg-background border-r border-border  h-screen shadow-md">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-foreground">
            📌 Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <Accordion
              type="single"
              collapsible
              className="w-full border-none"
              defaultValue="HTML"
            >
              {/* HTML Section */}
              <AccordionItem value="HTML" className="border-none">
                <AccordionTrigger className="hover:no-underline flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition">
                  <FolderCode className="size-5 text-primary" />
                  <span className="flex-1">HTML</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {blogData
                    ?.filter((item: any) => item.contentType === "HTML")
                    .map((item: HtmlBlogType, index: number) => (
                      <Link
                        key={index}
                        to={item.menuName.replace(/\s+/g, "-")}
                        smooth={true}
                        duration={400}
                        offset={-80}
                        className="pl-7 flex items-center gap-2 p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition cursor-pointer"
                      >
                        <CodeXml className="size-4 text-muted-foreground" />
                        {item.menuName}
                      </Link>
                    ))}
                </AccordionContent>
              </AccordionItem>

              {/* CSS Section */}
              <AccordionItem value="CSS" className="border-none">
                <AccordionTrigger className="hover:no-underline flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition">
                  <FolderCode className="size-5 text-primary" />
                  <span className="flex-1">CSS</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {blogData
                    ?.filter((item: any) => item.contentType === "CSS")
                    .map((item: HtmlBlogType, index: number) => (
                      <Link
                        key={index}
                        to={item.menuName.replace(/\s+/g, "-")}
                        smooth={true}
                        duration={400}
                        offset={-80}
                        className="pl-7  flex items-center gap-2 p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition cursor-pointer"
                      >
                        <CodeXml className="size-4 text-muted-foreground" />
                        {item.menuName}
                      </Link>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
