import { Router } from "express";
import fs from "fs";
import path from "path";
import { recalcProject, Project } from "../data/projects";

export const projectRouter = Router();

// 🔹 Path to JSON file
const dataFile = path.join(__dirname, "../data/projects.json");

// Utility: Read all projects
const readProjects = (): Project[] => {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return [];
  }
};

// Utility: Write all projects
const writeProjects = (projects: Project[]) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2));
  } catch (err) {
    console.error("Error writing projects.json:", err);
  }
};

// 🔹 Get all projects
projectRouter.get("/", (_, res) => {
  const projects = readProjects();
  res.json(projects);
});

// 🔹 Get one project
projectRouter.get("/:id", (req, res) => {
  const projects = readProjects();
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// 🔹 Create new project
projectRouter.post("/", (req, res) => {
  const { name, status, tasks }: Partial<Project> = req.body;
  if (!name || !status)
    return res.status(400).json({ error: "name and status are required" });

  const projects = readProjects();
  const newProject: Project = {
    id: projects.length ? projects[projects.length - 1].id + 1 : 1,
    name,
    status,
    tasks: tasks || [],
    progress: 0,
    taskCount: 0,
  };

  const updated = recalcProject(newProject);
  projects.push(updated);
  writeProjects(projects);

  res.status(201).json(updated);
});

// 🔹 Update project or its tasks
projectRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const projects = readProjects();
  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex === -1)
    return res.status(404).json({ error: "Project not found" });

  const updatedData: Partial<Project> = req.body;
  const existing = projects[projectIndex];

  const updatedProject = recalcProject({
    ...existing,
    ...updatedData,
    tasks: updatedData.tasks || existing.tasks,
  });

  projects[projectIndex] = updatedProject;
  writeProjects(projects);

  res.json(updatedProject);
});

// 🔹 Delete project
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
