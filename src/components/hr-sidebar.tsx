import {
  LayoutDashboard,
  LogOut,
  Calendar,
  Settings,
  Headphones,
  ChevronLeft,
  TrendingUp,
  UserRoundSearch,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
}

export function HrSidebar({
  isOpen,
  setIsOpen,
  sidebarWidth,
  setSidebarWidth,
  givenName,
  familyName,
  email,
  picture,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const minSidebarWidth = 240;
  const maxSidebarWidth = 300;
  const collapsedWidth = 72;

  const toggleSidebar = () => {
    if (!isOpen) {
      setIsOpen(true);
      setSidebarWidth(minSidebarWidth);
    } else {
      setIsOpen(false);
      setSidebarWidth(collapsedWidth);
    }
  };

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = Math.min(
        Math.max(event.clientX, minSidebarWidth),
        maxSidebarWidth,
      );
      setSidebarWidth(newWidth);
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
    document.body.style.userSelect = "";
  };

  const profilePic =
    picture && picture.startsWith("http") ? picture : "/avatar.png";

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 h-screen shadow-lg flex flex-col transition-all ease-in-out duration-200 will-change-[width] overflow-hidden border-r border-gray-200 dark:border-gray-800/50 bg-white dark:bg-gray-950"
      style={{
        width: isOpen ? sidebarWidth : collapsedWidth,
      }}
    >
      {/* Dark Mode Background with purple gradient accent */}
      <div className="absolute inset-0 opacity-100 dark:bg-gray-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-none" />
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full dark:bg-[radial-gradient(circle_400px_at_50%_300px,#a855f729,#000)]" />
      </div>

      <div className="relative flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800/50 bg-white/90 dark:bg-gray-900/20 backdrop-blur-sm">
        {sidebarWidth > 100 && (
          <h1 className="text-xl font-bold opacity-100 transition-opacity duration-200 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            SkillSage
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition relative z-10"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-gray-300" />
          ) : (
            <Image
              src="/sidebar.svg"
              alt="Sidebar Icon"
              width={24}
              height={24}
              className="dark:invert"
            />
          )}
        </button>
      </div>

      <nav className="relative flex-1 mt-4 overflow-hidden">
        <ul className="space-y-1 px-4">
          {[
            {
              href: "/h/dashboard",
              icon: LayoutDashboard,
              label: "Dashboard",
              color: "purple",
            },
            { 
              href: "/h/hire", 
              icon: UserRoundSearch, 
              label: "Hire",
              color: "green", 
            },
            { 
              href: "/h/rank", 
              icon: TrendingUp, 
              label: "Rank",
              color: "purple", 
            },
            { 
              href: "/h/schedule", 
              icon: Calendar, 
              label: "Schedule",
              color: "green", 
            },
            { 
              href: "/h/settings", 
              icon: Settings, 
              label: "Settings",
              color: "purple", 
            },
            { 
              href: "/h/support", 
              icon: Headphones, 
              label: "Support",
              color: "green", 
            },
          ].map(({ href, icon: Icon, label, color }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition group`}
              >
                <Icon
                  className={`w-6 h-6 min-w-[24px] ${
                    color === "purple" 
                      ? "text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" 
                      : "text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300"
                  }`}
                />
                {sidebarWidth > 100 && (
                  <span className={`ml-3 text-gray-700 dark:text-gray-300 group-hover:${
                    color === "purple" 
                      ? "text-purple-700 dark:text-purple-300" 
                      : "text-green-700 dark:text-green-300"
                  }`}>
                    {label}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <LogoutLink className="flex items-center p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition text-red-500 dark:text-red-400 group mt-6">
            <LogOut className="w-6 h-6 min-w-[24px] group-hover:text-red-600 dark:group-hover:text-red-300" />
            {sidebarWidth > 100 && <span className="ml-3 group-hover:text-red-600 dark:group-hover:text-red-300">Logout</span>}
          </LogoutLink>
        </ul>
      </nav>

      <div className="relative mt-auto p-4 space-y-3 border-t border-gray-200 dark:border-gray-800/50 bg-white/90 dark:bg-gray-900/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={profilePic}
              alt="User"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-purple-200 dark:ring-purple-900"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </div>
          {sidebarWidth > 100 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {givenName} {familyName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {email}
              </p>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-0 right-0 h-full w-[3px] bg-transparent cursor-ew-resize transition hover:bg-purple-400/50 dark:hover:bg-purple-600/30"
          onMouseDown={startResizing}
        />
      )}
    </aside>
  );
}
