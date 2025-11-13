import { create } from "zustand";
import { http } from "@/shared"; // your existing http wrapper (axios or fetch)

export interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: string;
}

interface NotificationStore {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  unreadCount: number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,

  // Fetch all notifications
  fetchNotifications: async () => {
    try {
      set({ loading: true, error: null });
      const res = await http.get<Notification[]>("/notifications");
      const notifications = res.data.reverse();
      const unreadCount = notifications.filter((n) => !n.read).length;
      console.log(unreadCount, 'unreadCount', notifications);
      set({ notifications, unreadCount, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // Mark one notification as read
  markAsRead: async (id: number) => {
    try {
      await http.put(`/notifications/${id}`, { read: true });
      const updated = get().notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      const unreadCount = updated.filter((n) => !n.read).length;
      set({ notifications: updated, unreadCount });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
