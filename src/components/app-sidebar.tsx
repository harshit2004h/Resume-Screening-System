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
  Bell,
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

export function AppSidebar({
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
      const newWidth = Math.min(Math.max(event.clientX, minSidebarWidth), maxSidebarWidth);
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
    { href: "/u/dashboard", icon: LayoutDashboard, label: "Dashboard", color: "green" },
    { href: "/u/resume", icon: FileText, label: "Resume", color: "green" },
    { href: "/u/rank", icon: TrendingUp, label: "Rank", color: "green" },
    { href: "/u/schedule", icon: Calendar, label: "Schedule", color: "green" },
    { href: "/u/notifications", icon: Bell, label: "Notifications", color: "green" },
    { href: "/u/profile", icon: Users, label: "Profile", color: "green" },
    { href: "/u/settings", icon: Settings, label: "Settings", color: "green" },
    { href: "/u/support", icon: Headphones, label: "Support", color: "green" },
  ];

  const profilePic = picture && picture.startsWith("http") ? picture : "/avatar.png";

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 ease-in-out border-r border-green-100 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-950 shadow-lg"
      style={{ width: isOpen ? sidebarWidth : collapsedWidth }}
    >
      <div className="relative flex items-center justify-between h-16 px-4 border-b border-green-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/20 backdrop-blur-sm">
        {sidebarWidth > 100 && (
          <h1 className="text-xl font-bold text-green-700 dark:text-green-300">SkillSage</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-green-100 dark:hover:bg-gray-800 transition"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 text-green-800 dark:text-gray-300" />
          ) : (
            <Image
              src="/assets/sidebar.svg"
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
          {links.map(({ href, icon: Icon, label, color }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center p-2 rounded-md hover:bg-green-100 dark:hover:bg-green-900 transition group"
              >
                <Icon
                  className={`w-6 h-6 min-w-[24px] text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300`}
                />
                {sidebarWidth > 100 && (
                  <span className="ml-3 text-green-800 dark:text-green-300 group-hover:text-green-900 dark:group-hover:text-green-200">
                    {label}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <LogoutLink className="flex items-center p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition text-red-500 dark:text-red-400 group mt-6">
            <LogOut className="w-6 h-6 min-w-[24px] group-hover:text-red-600 dark:group-hover:text-red-300" />
            {sidebarWidth > 100 && (
              <span className="ml-3 group-hover:text-red-600 dark:group-hover:text-red-300">Logout</span>
            )}
          </LogoutLink>
        </ul>
      </nav>

      <div className="relative mt-auto p-4 space-y-3 border-t border-green-100 dark:border-gray-800 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-950 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={profilePic}
              alt="User"
              width={40}
              height={40}
              className="rounded-full ring-2 ring-green-300 dark:ring-green-700"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
          </div>
          {sidebarWidth > 100 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {givenName} {familyName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{email}</p>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-0 right-0 h-full w-[3px] bg-transparent cursor-ew-resize hover:bg-green-400/50 dark:hover:bg-green-600/30"
          onMouseDown={startResizing}
        />
      )}
    </aside>
  );
}