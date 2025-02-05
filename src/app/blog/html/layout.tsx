import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/src/components/blog/html/app-sidebar";
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
        {children}
      </main>
    </SidebarProvider>
  );
}
