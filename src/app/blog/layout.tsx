"use client";
import { ThemeProvider } from "@/src/components/theme/theme-provider";
import { BlogProvider } from "@/src/context/BlogContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BlogProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </BlogProvider>
  );
}
