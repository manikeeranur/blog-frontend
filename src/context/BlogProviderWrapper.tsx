"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BlogProvider } from "@/src/context/BlogContext";
import { AppSidebar } from "@/src/components/blog/app-sidebar";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Navbar = dynamic(() => import("@/src/components/navbar"), {
  ssr: false,
});

export const BlogProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const showSidebar = pathName === "/add-blog" || pathName === "/blog";

  return (
    <BlogProvider>
      {pathName !== "/login" ? (
        <SidebarProvider>
          {showSidebar && <AppSidebar />}

          <main className={`w-full ${!showSidebar && "bg-[#f4f4f4] dark:bg-background"}`}>
            <div className="sticky top-0 left-0 z-[100]">
              <Suspense fallback={null}>
                <Navbar showSidebar={showSidebar} />
              </Suspense>
            </div>
            {children}
          </main>
        </SidebarProvider>
      ) : (
        <>{children}</>
      )}
    </BlogProvider>
  );
};
