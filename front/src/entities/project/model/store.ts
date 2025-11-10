import { create } from "zustand";

type Task = {
  id: number;
  name: string;
  complete: boolean;
};

type Project = {
  id: number;
  name: string;
  status: string;
  progress: number;
  tasks: Task[];
};

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => void;
  addProject: (name: string) => void;
  editProgress: (id: number, progress: number) => void;
  deleteProject: (id: number) => void;
  addTask: (projectId: number, taskName: string) => void;
  toggleTask: (projectId: number, taskId: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,

  fetchProjects: () =>
    set({
      projects: [
        {
          id: 1,
          name: "Website Redesign",
          status: "In Progress",
          progress: 60,
          tasks: [
            { id: 1, name: "UI Design", complete: true },
            { id: 2, name: "Frontend Integration", complete: false },
            { id: 3, name: "Testing", complete: false },
          ],
        },
        {
          id: 2,
          name: "Mobile App Launch",
          status: "Completed",
          progress: 100,
          tasks: [
            { id: 1, name: "API Setup", complete: true },
            { id: 2, name: "App Store Upload", complete: true },
          ],
        },
        {
          id: 3,
          name: "Marketing Campaign",
          status: "In Progress",
          progress: 35,
          tasks: [
            { id: 1, name: "Plan Ads", complete: false },
            { id: 2, name: "Design Banners", complete: true },
          ],
        },
      ],
    }),

  addProject: (name) =>
    set((state) => {
      const newProject: Project = {
        id: Date.now(),
        name,
        status: "In Progress",
        progress: 0,
        tasks: [],
      };
      return { projects: [...state.projects, newProject] };
    }),

  editProgress: (id, progress) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              progress,
              status: progress === 100 ? "Completed" : "In Progress",
            }
          : p
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  addTask: (projectId, taskName) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: [
                ...p.tasks,
                { id: Date.now(), name: taskName, complete: false },
              ],
            }
          : p
      ),
    })),

  toggleTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const updatedTasks = p.tasks.map((t) =>
          t.id === taskId ? { ...t, complete: !t.complete } : t
        );
        const completed = updatedTasks.filter((t) => t.complete).length;
        const progress =
          updatedTasks.length === 0
            ? 0
            : Math.round((completed / updatedTasks.length) * 100);
        return {
          ...p,
          tasks: updatedTasks,
          progress,
          status: progress === 100 ? "Completed" : "In Progress",
        };
      }),
    })),
}));
