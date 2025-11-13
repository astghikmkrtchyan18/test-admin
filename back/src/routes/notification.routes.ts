import { Router } from "express";
import fs from "fs";
import path from "path";

export const notificationRouter = Router();

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: string;
}

// 🔹 Path to JSON data file
const dataFile = path.join(__dirname, "../data/notification.json");

// Utility: Read from file
const readNotifications = (): Notification[] => {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading notification.json:", err);
    return [];
  }
};

// Utility: Write to file
const writeNotifications = (notifications: Notification[]) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(notifications, null, 2));
  } catch (err) {
    console.error("Error writing notification.json:", err);
  }
};

// 🔹 Get all notifications
notificationRouter.get("/", (_, res) => {
  const notifications = readNotifications();
  res.json(notifications);
});

// 🔹 Update a notification by ID
notificationRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const notifications = readNotifications();
  const index = notifications.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Notification not found" });
  }

  const existing = notifications[index];
  const updatedData: Partial<Notification> = req.body;

  const updatedNotification: Notification = {
    ...existing,
    ...updatedData,
  };

  notifications[index] = updatedNotification;
  writeNotifications(notifications);

  res.json(updatedNotification);
});

// 🔹 Mark all notifications as read
notificationRouter.put("/", (_, res) => {
  const notifications = readNotifications().map((n) => ({
    ...n,
    read: true,
  }));

  writeNotifications(notifications);
  res.json({ success: true, message: "All notifications marked as read" });
});

// 🔹 Delete a notification by ID
notificationRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const notifications = readNotifications();
  const filtered = notifications.filter((n) => n.id !== id);

  if (filtered.length === notifications.length) {
    return res.status(404).json({ error: "Notification not found" });
  }

  writeNotifications(filtered);
  res.json({ success: true, message: "Notification deleted successfully" });
});
