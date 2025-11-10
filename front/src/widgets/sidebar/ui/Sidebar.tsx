import { MenuList } from "@/entities/menu";
import {HatGlasses } from "lucide-react";

export const Sidebar = () => {

  return (
    <div
      className="w-72 transition duration-300 ease-in-out 
                 bg-white/80 dark:bg-slate-900/80 
                 backdrop-blur-xl border-r border-slate-200/50 
                 dark:border-slate-700/50 
                 flex flex-col relative z-10"
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 
                          rounded-xl flex items-center justify-center shadow-lg"
          >
            <HatGlasses className="w-6 h-6 text-white" />
          </div>
          {/* Conditional Rendering */}
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              TEST
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Admin panel
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <MenuList />
    

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        
      </div>
    </div>
  );
};
