"use client";
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
import { AppSidebar } from "../components/blog/app-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../components/theme/theme-toggle";
import FileUploader from "../components/common/FileUploader";
import { useState } from "react";
const Blog = dynamic(() => import("@/src/components/blog/blog"), {
  ssr: false,
});

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  console.log(imageUrl);
  const router = useRouter();
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full">
          {/* <SidebarTrigger className="absolute top-5 left-4 z-10" /> */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 left-0 bg-background z-10">
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

            <div className="ms-auto flex items-center gap-3">
              <Button onClick={() => router.push("/login")}>Admin Login</Button>
              <ThemeToggle />
            </div>
          </header>
          <Blog />
          {/* <FileUploader fileName="blog" setImageUrl={setImageUrl} /> */}
        </main>
      </SidebarProvider>
    </>
  );
}
