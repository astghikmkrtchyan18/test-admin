import { create } from "zustand";
import { http } from "@/shared";
import type { MenuStore, MenuItem } from "./types";

export const useMenuStore = create<MenuStore>((set) => ({
  items: [],
  collapsed: false,
  currentPage: "dashboard",
  loading: false,
  error: null,

  fetchMenu: async () => {
    try {
      set({ loading: true, error: null });
      const response = await http.get<MenuItem[]>("/menu");
      set({ items: response.data, loading: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  setSideBarCollapsed: () => {
    const { collapsed } = useMenuStore.getState();
    set({ collapsed:!collapsed })
  },
  setCurrentPage: (pageId: string) => set({ currentPage: pageId }),
}));
