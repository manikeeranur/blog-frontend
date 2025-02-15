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
import { CodeXml } from "lucide-react";
import { Link } from "react-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import htmlLogo from "@/src/images/skills/html.svg";
import cssLogo from "@/src/images/skills/css.svg";
import mainMenuLogo from "@/src/images/skills/computer-mouse.svg";
import bootstrapLogo from "@/src/images/skills/bootstrap.svg";
import javascriptLogo from "@/src/images/skills/javascript.svg";
import reactJsLogo from "@/src/images/skills/reactjs.svg";
import sqlLogo from "@/src/images/skills/sql.svg";
import JavaLogo from "@/src/images/skills/java.svg";

const sections = [
  { name: "HTML", logo: htmlLogo },
  { name: "CSS", logo: cssLogo },
  { name: "Bootstrap", logo: bootstrapLogo },
  { name: "Javascript", logo: javascriptLogo },
  { name: "ReactJs", logo: reactJsLogo },
  { name: "SQL", logo: sqlLogo },
  { name: "Java", logo: JavaLogo },
];

export function AppSidebar() {
  const { blogData } = useBlog();
  const safeBlogData = blogData || []; // Prevents undefined errors

  return (
    <Sidebar className="w-64 bg-background border-r border-border h-screen shadow-md">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm flex items-center gap-3 text-foreground h-auto mb-2 border-b rounded-none pb-2">
            <Image
              src={mainMenuLogo}
              alt="MainMenuLogo"
              width={45}
              height={45}
            />
            Student Coder Blog
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Accordion
              type="single"
              collapsible
              className="w-full border-none"
              defaultValue="HTML"
            >
              {sections.map(({ name, logo }) => {
                const sectionData = safeBlogData.filter(
                  (item: HtmlBlogType) => item.contentType === name
                );

                if (sectionData.length === 0) return null; // Hide empty sections

                return (
                  <AccordionItem
                    key={name}
                    value={name}
                    className="border-none"
                  >
                    <AccordionTrigger className="hover:no-underline flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition">
                      <Image
                        src={logo}
                        alt={`${name} Logo`}
                        width={15}
                        height={15}
                      />
                      <span className="flex-1">{name}</span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 max-h-[52vh] overflow-y-auto small-scrollbar">
                      {sectionData.map((item: HtmlBlogType, index: number) => (
                        <Link
                          key={`${item.menuName}-${index}`} // Ensure uniqueness
                          to={item.menuName.replace(/\s+/g, "-")}
                          smooth
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
                );
              })}
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
