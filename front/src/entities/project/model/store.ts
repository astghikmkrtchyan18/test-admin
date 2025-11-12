/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from "zustand";
import { http } from "@/shared";
import type { Project, Task } from "./types";


interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (name: string) => Promise<void>;
  editProgress: (id: number, progress: number) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  addTask: (projectId: number, task: Omit<Task, "id">) => Promise<void>;
  updateTask: (projectId: number, taskId: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (projectId: number, taskId: number) => Promise<void>;
  toggleTask: (projectId: number, taskId: number) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  // 🔹 Get all projects
  fetchProjects: async () => {
    try {
      set({ loading: true, error: null });
      const response = await http.get<Project[]>("/projects");
      set({ projects: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Add new project
  addProject: async (name) => {
    try {
      set({ loading: true, error: null });
      const response = await http.post<Project>("/projects", {
        name,
        status: "In Progress",
        tasks: [],
      });
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Update project progress
  editProgress: async (id, progress) => {
    try {
      set({ loading: true, error: null });
      const project = get().projects.find((p) => p.id === id);
      if (!project) throw new Error("Project not found");

      const updated = {
        ...project,
        progress,
        status: progress === 100 ? "Completed" : "In Progress",
      };

      const response = await http.put<Project>(`/projects/${id}`, updated);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? response.data : p
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Delete project
  deleteProject: async (id) => {
    try {
      set({ loading: true, error: null });
      await http.delete(`/projects/${id}`);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Add new task
  addTask: async (projectId, newTask) => {
    try {
      set({ loading: true, error: null });
      const project = get().projects.find((p) => p.id === projectId);
      if (!project) throw new Error("Project not found");

      const updatedTasks = [
        ...project.tasks,
        { id: Date.now(), ...newTask },
      ];

      const response = await http.put<Project>(`/projects/${projectId}`, {
        tasks: updatedTasks,
      });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? response.data : p
        ),
        loading: false,
      }));
      // @ts-ignore
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  // 🔹 Update existing task
  updateTask: async (projectId, taskId, updates) => {
    try {
      set({ loading: true, error: null });
      const project = get().projects.find((p) => p.id === projectId);
      if (!project) throw new Error("Project not found");

      const updatedTasks = project.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updates } : t
      );

      const response = await http.put<Project>(`/projects/${projectId}`, {
        tasks: updatedTasks,
      });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? response.data : p
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Delete task
  deleteTask: async (projectId, taskId) => {
    try {
      set({ loading: true, error: null });
      const project = get().projects.find((p) => p.id === projectId);
      if (!project) throw new Error("Project not found");

      const updatedTasks = project.tasks.filter((t) => t.id !== taskId);

      const response = await http.put<Project>(`/projects/${projectId}`, {
        tasks: updatedTasks,
      });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? response.data : p
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // 🔹 Toggle task complete/incomplete
  toggleTask: async (projectId, taskId) => {
    try {
      set({ loading: true, error: null });
      const project = get().projects.find((p) => p.id === projectId);
      if (!project) throw new Error("Project not found");

      const updatedTasks = project.tasks.map((t) =>
        t.id === taskId ? { ...t, complete: !t.complete } : t
      );

      const response = await http.put<Project>(`/projects/${projectId}`, {
        tasks: updatedTasks,
      });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? response.data : p
        ),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
