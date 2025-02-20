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
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/src/components/blog/app-sidebar";
import { ThemeToggle } from "@/src/components/theme/theme-toggle";
import LogoutButton from "@/src/components/LogoutButton";

const Blog = dynamic(() => import("@/src/components/blog/blog"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full">
          {/* <SidebarTrigger className="absolute top-5 left-4 z-10" /> */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 left-0 bg-background z-10">
            <SidebarTrigger />

            <Breadcrumb className="py-1.5 px-3 rounded-lg hidden md:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronsRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronsRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Programming</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="ms-auto flex items-center gap-3">
              <LogoutButton />
              <ThemeToggle />
            </div>
          </header>
          <Blog />
        </main>
      </SidebarProvider>
    </>
  );
}
