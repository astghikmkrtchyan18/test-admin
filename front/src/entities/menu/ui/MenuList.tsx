import { useEffect } from "react";
import { useMenuStore } from "../model/store";
import { useNavigate } from "react-router";

export const MenuList = () => {
  const { items, loading, error, fetchMenu } = useMenuStore();
    const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);
  if (loading) return <div className="p-4 text-slate-500">Loading menu...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      {items?.map((item) => (
            <div key={item.id}>
              <button
                 onClick={() => navigate(item.url)}
                className="cursor-pointer w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  {/* <item.icon className="w-5 h-5" /> */}
                  <>
                    <span className="font-medium ml-2">{item.label}</span>
                    {item.badge && (<span className="px-2 py-1 text-xs bg-red-500 text-white- rounded-full">
                      {item.badge}
                    </span>)}
                    {item.count && (<span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full"> {item.count}</span>)}
                  </>
                </div>
              </button>
              <div className="ml-8 mt-2 space-y-1">
                {/* {item.submenu?.map((subitem) => {
                  return <button key={subitem.id}>{subitem.label}</button>
                })} */}
              </div>

            </div>
      ))}
    </nav>
  );
};
