import cron from "node-cron";
import fs from "fs";
import path from "path";
import { Project } from "../types/projects";
import { Notification } from "../types/notification";


// Paths
const notifFile = path.join(__dirname, "../data/notification.json");
const projectFile = path.join(__dirname, "../data/projects.json");

// Read files
const readNotifications = (): Notification[] => {
  try {
    return JSON.parse(fs.readFileSync(notifFile, "utf-8"));
  } catch {
    return [];
  }
};

const writeNotifications = (notifications: Notification[]) => {
  fs.writeFileSync(notifFile, JSON.stringify(notifications, null, 2));
};

const readProjects = (): Project[] => {
  try {
    return JSON.parse(fs.readFileSync(projectFile, "utf-8"));
  } catch {
    return [];
  }
};

export const startDeadlineChecker = () => {
  // Runs every day at 00:00
  cron.schedule("0 0 * * *", () => {
    console.log("🔄 Running deadline checker...");

    const projects = readProjects();
    const notifications = readNotifications();

    const now = new Date();

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (!task.end_date) return;

        const endDate = new Date(task.end_date);

        // Calculate difference in full days
        const diffMs = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 3) {
          // Create notification
          notifications.push({
            id: Date.now(),
            title: `Task Deadline Warning`,
            message: `Task "${task.name}" from project "${project.name}" is due in 3 days.`,
            read: false,
            date: new Date().toISOString(),
          });
        }
      });
    });

    writeNotifications(notifications);
  });
};
