export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string; // ISO date string
  read: boolean;
}