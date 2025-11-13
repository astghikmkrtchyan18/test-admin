import { useEffect, useState } from "react";
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
  Info,
} from "lucide-react";
import { useDarkMode } from "@/shared/hooks/useDarkMode";
import { useNotificationStore } from "@/entities/notification/model/store";

export function Header() {
  const { setSideBarCollapsed, currentPage, collapsed } = useMenuStore();
  const [dark, setDark] = useDarkMode();
  const { notifications, unreadCount, fetchNotifications, markAsRead } =
    useNotificationStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const markAllAsRead = async () => {
    await Promise.all(
      notifications.filter((n) => !n.read).map((n) => markAsRead(n.id))
    );
  };

  return (
    <header className="flex items-center justify-between bg-white/80 dark:bg-slate-900/80  border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 relative">
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
      <div className="flex items-center space-x-3 relative">
        <button className="hidden lg:flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-md transition-all">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>

        <IconButton
          icon={dark ? Moon : Sun}
          label="Toggle theme"
          onClick={() => setDark(!dark)}
        />

        {/* 🔔 Notification dropdown */}
        <div className="relative">
          <NotificationButton count={unreadCount} onClick={toggleDropdown} />
          {open && (
            <div className="absolute z-1  right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                  Notifications
                </h3>
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-4">
                    No notifications
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`px-4 py-3 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-none transition-colors ${
                        n.read
                          ? "bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/40"
                          : "bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-800/60"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              n.read
                                ? "text-slate-700 dark:text-slate-300"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {n.message}
                          </p>
                        </div>
                        {!n.read && (
                          <Info className="w-4 h-4 text-red-500 mt-1" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {new Date(n.date).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <IconButton icon={Settings} label="Settings" />
      </div>
    </header>
  );
}

/* Small reusable button components */

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

function NotificationButton({
  count,
  onClick,
}: {
  count: number;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label="Notifications"
      onClick={onClick}
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
