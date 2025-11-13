import { useEffect, useState } from "react";
import { useMenuStore } from "../model/store";
import { useNavigate } from "react-router";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const MenuList = () => {
  const {
    items,
    collapsed,
    currentPage,
    loading,
    error,
    fetchMenu,
    setCurrentPage,
  } = useMenuStore();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

  const toggleExpended = (itemId: string) => {
    const newExpended = new Set(expandedItems);
    if (newExpended.has(itemId)) {
      newExpended.delete(itemId);
    } else {
      newExpended.add(itemId);
    }
    setExpandedItems(newExpended);
  };
  const onPageChange = (id: string, url: string) => {
    setCurrentPage(id);
    navigate(url);
  };
  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);
  if (loading) return <div className="p-4 text-slate-500">Loading menu...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto ">
      {items.map((item) => {
        const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon;
        return (
          <div key={item.id}>
            <button
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer
                  ${
                    currentPage === item.id
                      ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
              onClick={() => {
                if (item.submenu) {
                  toggleExpended(item.id);
                } else {
                  onPageChange(item.id, item.url);
                }
              }}
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
                        {" "}
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!collapsed && item.submenu && (
                <Icons.ChevronDown className="w-4 h-4 transition-transform" />
              )}
            </button>
            {!collapsed && item.submenu && expandedItems.has(item.id) && (
              <div className="ml-8 mt-2 space-y-1">
                {item.submenu?.map((subitem) => {
                  return (
                    <button
                      key={subitem.id}
                      className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all"
                      onClick={() => onPageChange(item.id, item.url)}
                      //  onClick={() => onPageChange(item.id, subitem.id)}
                    >
                      {subitem.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
