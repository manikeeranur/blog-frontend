import { SidebarInset } from "@/components/ui/sidebar";
import HtmlBlogForm from "@/src/components/blog/html/htm-blog-form";

export default function Page() {
  return (
    <SidebarInset className="p-5">
      <HtmlBlogForm />
    </SidebarInset>
  );
}
