import { Router } from "express";
import fs from "fs";
import path from "path";

export interface Task {
  id: number;
  name: string;
  complete: boolean;
}

export interface Project {
  id: number;
  name: string;
  status: string;
  progress: number;
  tasks: Task[];
}

export const projectRouter = Router();

// 🔹 Path to JSON data file
const dataFile = path.join(__dirname, "../data/projects.json");

// Utility: Read from file
const readProjects = (): Project[] => {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return [];
  }
};

// Utility: Write to file
const writeProjects = (projects: Project[]) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2));
  } catch (err) {
    console.error("Error writing projects.json:", err);
  }
};

// Utility: Recalculate project progress
const recalcProject = (project: Project): Project => {
  const completed = project.tasks.filter((t) => t.complete).length;
  const progress =
    project.tasks.length === 0
      ? 0
      : Math.round((completed / project.tasks.length) * 100);
  const status = progress === 100 ? "Completed" : "In Progress";

  return { ...project, progress, status };
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

// POST /api/projects
projectRouter.post("/", (req, res) => {
  const { name, status, tasks }: Partial<Project> = req.body;
  if (!name)
    return res.status(400).json({ error: "Project name is required" });

  const projects = readProjects();
  const newProject: Project = {
    id: projects.length ? projects[projects.length - 1].id + 1 : 1,
    name,
    status: status || "In Progress",
    tasks: tasks || [],
    progress: 0,
  };

  const updated = recalcProject(newProject);
  projects.push(updated);
  writeProjects(projects);

  res.status(201).json(updated);
});

// PUT /api/projects/:id
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
  res.json(updatedProject);
});

// DELETE /api/projects/:id
projectRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Project not found" });

  projects.splice(index, 1);
  writeProjects(projects);
  res.json({ message: "Project deleted" });
});
