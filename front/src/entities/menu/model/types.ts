export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  count?: string;
  url: string;
  submenu?: MenuItem[];
}

export interface MenuStore {
  items: MenuItem[];
  collapsed: boolean;
  currentPage: string;
  loading: boolean;
  error: string | null;
  fetchMenu: () => Promise<void>;
  setSideBarCollapsed: () => void;
  setCurrentPage: (pageId: string) => void;
}