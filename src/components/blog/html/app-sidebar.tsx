"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useBlog } from "@/src/context/BlogContext";
import { Link } from "react-scroll";

export function AppSidebar() {
  const { blogData } = useBlog();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {blogData?.map((item: any, index: any) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.menuName.replace(/\s+/g, "-")}
                      smooth={true}
                      duration={400}
                      offset={-80}
                      className="text-[#3f3f46b2] cursor-pointer hover:no-underline"
                    >
                      {item.menuName}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
