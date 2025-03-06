import {
  FileText,
  LayoutDashboard,
  LogOut,
  Calendar,
  Users,
  Settings,
  Headphones,
  ChevronLeft,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  userName: string;
}

export function AppSidebar({
  isOpen,
  setIsOpen,
  sidebarWidth,
  setSidebarWidth,
  userName,
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

  const links = [
    { href: `/u/${userName}/dashboard`, icon: LayoutDashboard, label: "Dashboard" },
    { href: `/u/${userName}/resume`, icon: FileText, label: "Resume" },
    { href: `/u/${userName}/rank`, icon: TrendingUp, label: "Rank" },
    { href: `/u/${userName}/schedule`, icon: Calendar, label: "Schedule" },
    { href: `/u/${userName}/profile`, icon: Users, label: "Profile" },
    { href: `/u/${userName}/settings`, icon: Settings, label: "Settings" },
    { href: `/u/${userName}/support`, icon: Headphones, label: "Support" },
    { 
      href: `/u/${userName}/logout`, 
      icon: LogOut, 
      label: "Logout", 
      className: "text-red-500 dark:text-red-400" 
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 h-screen shadow-lg flex flex-col transition-all ease-in-out duration-200 will-change-[width] overflow-hidden border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
      style={{
        width: isOpen ? sidebarWidth : collapsedWidth,
      }}
    >
      <div className="relative flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        {sidebarWidth > 100 && (
          <h1 className="text-xl font-bold opacity-100 transition-opacity duration-200 text-gray-900 dark:text-gray-100">
            SkillSage
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition relative z-10"
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
          {links.map(({ href, icon: Icon, label, className }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className || "text-gray-900 dark:text-gray-300"}`}
              >
                <Icon className="w-6 h-6 min-w-[24px]" />
                {sidebarWidth > 100 && <span className="ml-3">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative mt-auto p-4 space-y-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <div className="flex items-center space-x-3">
          <Image
            src="/avatar.png"
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          {sidebarWidth > 100 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {userName}
                {userName || "Angela White"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                angelawhite@gmail.com
              </p>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-0 right-0 h-full w-[3px] bg-transparent cursor-ew-resize transition hover:bg-gray-400/50 dark:hover:bg-gray-600"
          onMouseDown={startResizing}
        />
      )}
    </aside>
  );
}
