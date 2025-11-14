import { useEffect, useState } from "react";
import { useMenuStore } from "../model/store";
import { useNavigate } from "react-router";
import { MenuItem } from "./MenuItem";

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

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const onPageChange = (id: string, url: string) => {
    setCurrentPage(id);
    navigate(url);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) return <div className="p-4 text-slate-500">Loading menu...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          collapsed={collapsed}
          currentPage={currentPage}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          onPageChange={onPageChange}
        />
      ))}
    </nav>
  );
};
