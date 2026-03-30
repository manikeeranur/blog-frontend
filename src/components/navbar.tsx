"use client";

import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LogoutButton from "@/src/components/LogoutButton";
import { ThemeToggle } from "@/src/components/theme/theme-toggle";
import { useBlog } from "@/src/context/BlogContext";
import Image from "next/image";
import mainMenuLogo from "@/src/images/skills/computer-mouse.svg";
import dynamic from "next/dynamic";

const SearchBox = dynamic(() => import("@/src/components/blog/search-box"), {
  ssr: false,
});

const allNavItems = [
  { label: "HTML", type: "html" },
  { label: "CSS", type: "css" },
  { label: "JavaScript", type: "js" },
  { label: "React", type: "reactjs" },
  { label: "FE Interview", type: "fei" },
];

const Navbar = ({ showSidebar }: { showSidebar?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { blogData, currentType, setCurrentType } = useBlog();

  const visibleTypes = (blogData || [])
    .map((item: any) => item.contentType?.toLowerCase())
    .map((type: string) => {
      if (type === "fe_interview") return "fei";
      if (type === "javascript") return "js";
      return type;
    })
    .filter(Boolean);

  const navItems = allNavItems.filter((item) =>
    visibleTypes.includes(item.type)
  );

  const handleRoute = (type: string) => {
    setIsOpen(false);
    setCurrentType(type);
  };

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md border-border/60">
      <div
        className={`mx-auto px-4 sm:px-6 ${
          !showSidebar ? "lg:w-[80%] lg:mx-auto" : "lg:px-8"
        }`}
      >
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            {showSidebar && <SidebarTrigger />}
            <Image src={mainMenuLogo} alt="logo" width={38} height={38} />
            <span className="text-sm font-semibold tracking-tight hidden sm:block">
              Student Coder Tech
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
            {!showSidebar && (
              <Suspense fallback={null}>
                <div className="w-48 lg:w-60">
                  <SearchBox />
                </div>
              </Suspense>
            )}

            <div className="flex items-center gap-1 bg-muted/60 rounded-full px-1.5 py-1">
              {navItems.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleRoute(item.type)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                    currentType === item.type
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {showSidebar && <LogoutButton />}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border/60 px-4 py-3 space-y-3 bg-background/95 backdrop-blur-md">
          <Suspense fallback={null}>
            <SearchBox />
          </Suspense>

          <div className="flex flex-wrap gap-2 pt-1">
            {navItems.map((item) => (
              <button
                key={item.type}
                onClick={() => handleRoute(item.type)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  currentType === item.type
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {showSidebar && (
            <div className="pt-1 border-t border-border/40">
              <LogoutButton />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
