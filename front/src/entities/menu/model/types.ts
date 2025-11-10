export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  count?: string;
  url: string;
}

export interface MenuStore {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
  fetchMenu: () => Promise<void>;
}