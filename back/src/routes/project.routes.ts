import { Router } from "express";
import fs from "fs";
import path from "path";
import { Project, Task } from "../types/projects";

export const projectRouter = Router();

// ============================================================
// 🔹 Paths
// ============================================================
const dataFile = path.join(__dirname, "../data/projects.json");
const notifFile = path.join(__dirname, "../data/notification.json");

// ============================================================
// 🔹 Types
// ============================================================
export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string; // ISO string
  read: boolean;
}

// ============================================================
// 🔹 Utilities
// ============================================================

// Read projects
const readProjects = (): Project[] => {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Write projects
const writeProjects = (projects: Project[]) => {
  fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2));
};

// Read notifications
const readNotifications = (): Notification[] => {
  try {
    const data = fs.readFileSync(notifFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Write notifications
const writeNotifications = (notifs: Notification[]) => {
  fs.writeFileSync(notifFile, JSON.stringify(notifs, null, 2));
};

// Create new notification
const createNotification = (title: string, message: string) => {
  const notifications = readNotifications();
  const newNotif: Notification = {
    id: Date.now(),
    title,
    message,
    date: new Date().toISOString(),
    read: false,
  };
  notifications.push(newNotif);
  writeNotifications(notifications);
  return newNotif;
};

// Recalculate project progress
const recalcProject = (project: Project): Project => {
  const completed = project.tasks.filter((t) => t.complete).length;
  const progress =
    project.tasks.length === 0
      ? 0
      : Math.round((completed / project.tasks.length) * 100);
  const status = progress === 100 ? "Completed" : "In Progress";
 createNotification("Projcet Copleted", `Project "${project.name}" has been completed.`);
  return { ...project, progress, status, taskCount: project.tasks.length };
};

// ============================================================
// 🔹 API Endpoints
// ============================================================

// GET /api/projects
projectRouter.get("/", (_, res) => {
  const projects = readProjects();
  res.json(projects);
});

// GET /api/projects/:id
projectRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const projects = readProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// POST /api/projects → Create Project + Notification
projectRouter.post("/", (req, res) => {
  const { name, status, tasks }: Partial<Project> = req.body;
  if (!name)
    return res.status(400).json({ error: "Project name is required" });

  const projects = readProjects();
  const newProject: Project = {
    id: Date.now(),
    name,
    status: status || "In Progress",
    tasks: tasks || [],
    progress: 0,
    created_date: new Date().toISOString(),
    ownerId: 1,
    taskCount: tasks ? tasks.length : 0,
  };

  const updated = recalcProject(newProject);
  projects.push(updated);
  writeProjects(projects);

  // 🔹 Create notification
  createNotification(
    "New Project Created",
    `Project "${updated.name}" has been created successfully.`
  );

  res.status(201).json(updated);
});

// PUT /api/projects/:id → Update Project + Notification
projectRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Project not found" });

  const existing = projects[index];
  const updatedData: Partial<Project> = req.body;

  const updatedProject = recalcProject({
    ...existing,
    ...updatedData,
    tasks: updatedData.tasks || existing.tasks,
  });

  projects[index] = updatedProject;
  writeProjects(projects);

  // 🔹 Create notification
  createNotification(
    "Project Updated",
    `Project "${updatedProject.name}" has been updated.`
  );

  res.json(updatedProject);
});

// DELETE /api/projects/:id
projectRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Project not found" });

  const deleted = projects.splice(index, 1)[0];
  writeProjects(projects);

  // 🔹 Create notification
  createNotification(
    "Project Deleted",
    `Project "${deleted.name}" has been deleted.`
  );

  res.json({ message: "Project deleted" });
});

// ============================================================
// 🔹 TASKS ENDPOINTS
// ============================================================

// POST /api/projects/:projectId/tasks → Create Task + Notification
projectRouter.post("/:projectId/tasks", (req, res) => {
  const projectId = Number(req.params.projectId);
  const { name, complete }: Partial<Task> = req.body;

  if (!name)
    return res.status(400).json({ error: "Task name is required" });

  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  if (index === -1)
    return res.status(404).json({ error: "Project not found" });

  const newTask: any = {
    id: Date.now(),
    name,
    complete: complete || false,
  };

  projects[index].tasks.push(newTask);
  const updatedProject = recalcProject(projects[index]);
  projects[index] = updatedProject;
  writeProjects(projects);

  // 🔹 Create notification
  createNotification(
    "New Task Created",
    `Task "${newTask.name}" was added to project "${updatedProject.name}".`
  );

  res.status(201).json(newTask);
});

// PUT /api/projects/:projectId/tasks/:taskId → Update Task + Notification
projectRouter.put("/:projectId/tasks/:taskId", (req, res) => {
  const projectId = Number(req.params.projectId);
  const taskId = Number(req.params.taskId);
  const { name, complete }: Partial<Task> = req.body;

  const projects = readProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return res.status(404).json({ error: "Project not found" });

  const task = project.tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (name !== undefined) task.name = name;
  if (complete !== undefined) task.complete = complete;

  const updatedProject = recalcProject(project);
  const projectIndex = projects.findIndex((p) => p.id === projectId);
  projects[projectIndex] = updatedProject;
  writeProjects(projects);

  // 🔹 Create notification
  if(complete) {
    const notifMsg =  `Task "${task.name}" in project "${project.name}" was marked as complete.`
    // : `Task "${task.name}" in project "${project.name}" was updated.`;
  createNotification("Task Updated", notifMsg);
  }
  res.json(task);
});
