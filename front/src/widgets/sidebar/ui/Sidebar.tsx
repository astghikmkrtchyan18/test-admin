import { MenuList } from "@/entities/menu";
import { useMenuStore } from "@/entities/menu/model/store";
import { LampDesk } from "lucide-react";

export const Sidebar = () => {
    const {
      collapsed,
    } = useMenuStore();
  return (
    <div
      className={` ${collapsed ? "w-20" : "w-72"} transition-all duration-300 ease-in-out 
                 bg-white/80 dark:bg-slate-900/80 
                 backdrop-blur-xl border-r border-slate-200/50 
                 dark:border-slate-700/50 
                 flex flex-col relative z-10`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 
                          rounded-xl flex items-center justify-center shadow-lg"
          >
            <LampDesk className="w-6 h-6 text-white" />
          </div>

          {/* Conditional Rendering */}
          {
            !collapsed && (
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                  Test
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Admin panel
                </p>
              </div>
            )
          }
        </div>
      </div>
      {/* Menu Items */}
      <MenuList  />
      
      {/* User Profile */}
      {/* {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src="https://via.placeholder.com/40"
              alt="user"
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                Alex Johnson
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Administrator
              </p>
            </div>
          </div>
        </div>)} */}
    </div>
  );
};

