"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { SidebarTrigger } from "@/components/ui/sidebar";
import LogoutButton from "@/src/components/LogoutButton";
import { ThemeToggle } from "@/src/components/theme/theme-toggle";
import { useBlog } from "@/src/context/BlogContext";
import Image from "next/image";
import mainMenuLogo from "@/src/images/skills/computer-mouse.svg";
import dynamic from "next/dynamic";

// Dynamic import
const SearchBox = dynamic(() => import("@/src/components/blog/search-box"), {
  ssr: false,
});

// ✅ Full nav items
const allNavItems = [
  { label: "HTML", type: "html" },
  { label: "CSS", type: "css" },
  { label: "JavaScript", type: "js" },
  { label: "React", type: "reactjs" },
  { label: "FE Interview", type: "fei" },
];

const Navbar = ({ showSidebar }: { showSidebar?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "html";

  const { blogData } = useBlog();

  // ✅ Extract types from blogData contentType (converted to lowercase and matched to navItem type)
  const visibleTypes = (blogData || [])
    .map((item: any) => item.contentType?.toLowerCase())
    .map((type: string) => {
      if (type === "fe_interview") return "fei";
      if (type === "javascript") return "js";
      return type;
    })
    .filter(Boolean);

  // ✅ Filter only navItems that match available types
  const navItems = allNavItems.filter((item) =>
    visibleTypes.includes(item.type)
  );

  const handleRoute = (type: string) => {
    setIsOpen(false);
    router.push(`/?type=${type}`);
  };

  return (
    <nav className="border-b bg-background bg-gradient-to-r from-[#d8f4b0b0] to-[#fff]">
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          !showSidebar && "lg:w-[80%] lg:mx-auto"
        }`}
      >
        <div className="grid grid-cols-2 gap-4 justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-1 flex items-center gap-3">
            {showSidebar && <SidebarTrigger />}
            <Image
              src={mainMenuLogo}
              alt="MainMenuLogo"
              width={45}
              height={45}
            />
            <small className="text-sm">Student Coder Tech</small>
          </div>

          <div className="flex-1">
            {/* Desktop Nav */}
            <div className="hidden md:flex md:items-center space-x-6">
              {!showSidebar && (
                <Suspense fallback={<div>Loading search...</div>}>
                  <div className="md:flex-1">
                    <SearchBox />
                  </div>
                </Suspense>
              )}
              {navItems.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleRoute(item.type)}
                  className={clsx(
                    "px-4 py-1 rounded-md text-sm font-medium",
                    currentType === item.type &&
                      "!text-[#000] bg-green-300 border shadow-none"
                  )}
                >
                  {item.label}
                </button>
              ))}
              {showSidebar && <LogoutButton />}
              {/* <ThemeToggle /> */}
            </div>

            {/* Mobile Nav Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          {navItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleRoute(item.type)}
              className={clsx(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium mt-1",
                currentType === item.type
                  ? "text-white bg-blue-600"
                  : "text-gray-700 hover:bg-gray-200"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
