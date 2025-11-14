import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MenuSubItem } from "./MenuSubItem";

export const MenuItem = ({
  item,
  collapsed,
  currentPage,
  expandedItems,
  toggleExpanded,
  onPageChange,
}: {
  item: any;
  collapsed: boolean;
  currentPage: string;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
  onPageChange: (id: string, url: string) => void;
}) => {
  const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon;
  const isExpanded = expandedItems.has(item.id);

  return (
    <div>
      <button
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer
        ${
          currentPage === item.id
            ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
        }`}
        onClick={() =>
          item.submenu ? toggleExpanded(item.id) : onPageChange(item.id, item.url)
        }
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5" />

          {!collapsed && (
            <>
              <span className="font-medium ml-2">{item.label}</span>

              {item.badge && (
                <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}

              {item.count && (
                <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                  {item.count}
                </span>
              )}
            </>
          )}
        </div>

        {!collapsed && item.submenu && (
          <Icons.ChevronDown
            className={`w-4 h-4 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Submenu */}
      {!collapsed && item.submenu && isExpanded && (
        <div className="ml-8 mt-2 space-y-1">
          {item.submenu.map((sub: any) => (
            <MenuSubItem
              key={sub.id}
              parent={item}
              subitem={sub}
              onPageChange={onPageChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
