import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/src/components/blog/html/app-sidebar";
import LogoutButton from "@/src/components/LogoutButton";
import { ThemeToggle } from "@/src/components/theme/theme-toggle";
import { ChevronsRight } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative">
        <header className="blog-header flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 left-0 bg-white  z-10">
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

          <div className="ms-auto">
            <LogoutButton />
            <ThemeToggle />
          </div>
        </header>

        {children}
      </main>
    </SidebarProvider>
  );
}
