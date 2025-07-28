"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BlogProvider } from "@/src/context/BlogContext";
import { ThemeToggle } from "@/src/components/theme/theme-toggle";
import LogoutButton from "@/src/components/LogoutButton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";
import { AppSidebar } from "@/src/components/blog/app-sidebar";
import Navbar from "@/src/components/navbar";

export const BlogProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathName = usePathname();

  const showSidebar = pathName === "/add-blog" || pathName === "/blog";
  const Navbar = dynamic(() => import("@/src/components/navbar"), {
    ssr: false,
  });
  return (
    <BlogProvider>
      {pathName !== "/login" ? (
        <SidebarProvider>
          {showSidebar && <AppSidebar />}

          <main className={`w-full ${!showSidebar && "bg-[#f4f4f4]"}`}>
            <div className="!sticky top-0 left-0 z-[100]">
              <Suspense fallback={<div>Loading navbar...</div>}>
                <Navbar showSidebar={showSidebar} />
              </Suspense>
            </div>

            {/* <header className="sticky top-0 left-0 bg-background z-[100]">
              <div className="flex h-16 shrink-0 items-center gap-2 px-4">
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
                  {pathName === "/blog" && <LogoutButton />}
                  {!showSidebar && (
                    <Suspense fallback={<div>Loading search...</div>}>
                      <SearchBox />
                    </Suspense>
                  )}
                  <ThemeToggle />
                </div>
              </div>
            </header> */}
            {children}
          </main>
        </SidebarProvider>
      ) : (
        <>{children}</>
      )}
    </BlogProvider>
  );
};
