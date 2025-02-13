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
import { CodeXml, FolderCode } from "lucide-react";
import { Link } from "react-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import htmlLogo from "@/src/images/skills/html.svg";
import cssLogo from "@/src/images/skills/css.svg";
import javascriptLogo from "@/src/images/skills/javascript.svg";
import Image from "next/image";
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
                  <Image
                    src={htmlLogo}
                    alt="HTML Logo"
                    width={15}
                    height={15}
                  />
                  <span className="flex-1"> HTML</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <div className="max-h-[52vh] overflow-y-auto small-scrollbar">
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
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CSS Section */}
              <AccordionItem value="CSS" className="border-none">
                <AccordionTrigger className="hover:no-underline flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition">
                  <Image src={cssLogo} alt="css Logo" width={15} height={15} />
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
