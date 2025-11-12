import { useMenuStore } from "@/entities/menu/model/store";
import {
  Bell,
  Filter,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useDarkMode } from "@/shared/hooks/useDarkMode";

export function Header() {
  const { setSideBarCollapsed, currentPage, collapsed } = useMenuStore();
  const [dark, setDark] = useDarkMode();

  return (
    <header className="flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <IconButton
          icon={Menu}
          label="Open menu"
          onClick={setSideBarCollapsed}
          className={`${collapsed ? "rotate-90" : ""} transition-transform`}
        />

        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {/* Welcome back, UserName! Here's what's happening today. */}
          </p>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            aria-label="Open filters"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <button className="hidden lg:flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-md transition-all">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>
        <IconButton
          icon={dark ? Moon : Sun}
          label="Toggle theme"
          onClick={() => setDark(!dark)}
        />

        <NotificationButton count={3} />
        <IconButton icon={Settings} label="Settings" />

        {/* Profile */}
        {/* <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
          <img
            src="https://via.placeholder.com/40"
            alt="User avatar"
            className="w-8 h-8 rounded-full ring-2 ring-blue-500"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Alex Johnson
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Administrator
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>  */}
      </div>
    </header>
  );
}

/* Small reusable button components for clean JSX */

interface IconButtonProps {
  icon: LucideIcon | React.ElementType;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  className = "",
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

function NotificationButton({ count }: { count: number }) {
  return (
    <button
      aria-label="Notifications"
      className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
