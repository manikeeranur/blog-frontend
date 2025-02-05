"use client";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import dynamic from "next/dynamic";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/blog/html/app-sidebar";

const HtmlBlog = dynamic(() => import("@/src/components/blog/html/html-blog"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      {/* <ProtectedRoute> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="relative">
          {/* <SidebarTrigger className="absolute top-5 left-4 z-10" /> */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 left-0 bg-white z-10">
            <SidebarTrigger className="mt-1" />

            <Breadcrumb className="py-1.5 px-3 rounded-lg">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronsRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#/components">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronsRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink>HTML</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <HtmlBlog />
        </main>
      </SidebarProvider>
      {/* </ProtectedRoute> */}
    </>
  );
}
