export interface Task {
  id: number;
  name: string;
  complete: boolean;
}

export interface Project {
  id: number;
  name: string;
  status: "In Progress" | "Completed" | "Pending";
  tasks: Task[];
  progress: number;     // calculated automatically
  taskCount: number;    // calculated automatically
}

// Utility to calculate progress and task count
const calcProgress = (tasks: Task[]) => {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.complete).length;
  return Math.round((completed / tasks.length) * 100);
};

// Initial mock data
export let projects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    tasks: [
      { id: 1, name: "UI Design", complete: true },
      { id: 2, name: "Frontend Integration", complete: false },
      { id: 3, name: "Testing", complete: false },
    ],
    progress: 0, // placeholder
    taskCount: 0,
  },
  {
    id: 2,
    name: "Mobile App Launch",
    status: "Completed",
    tasks: [
      { id: 1, name: "API Setup", complete: true },
      { id: 2, name: "App Store Upload", complete: true },
    ],
    progress: 0,
    taskCount: 0,
  },
];

// Initialize progress + task counts
projects = projects.map((p) => ({
  ...p,
  progress: calcProgress(p.tasks),
  taskCount: p.tasks.length,
}));

// Helper for recalculating project stats
export const recalcProject = (project: Project): Project => ({
  ...project,
  progress: calcProgress(project.tasks),
  taskCount: project.tasks.length,
});