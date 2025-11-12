export interface MenuItem {
  id: string;
  icon: string; // e.g., icon name like 'FolderOpen'
  label: string;
  url: string;
  count?: string; // optional, since not all items have it
  badge?: string; // optional, since not all items have it
}

// Example type for the whole menu array
export type MenuList = MenuItem[];