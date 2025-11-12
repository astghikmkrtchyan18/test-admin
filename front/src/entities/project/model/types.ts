export interface Task {
  id: number;
  name: string;
  complete: boolean;
  assigned: number;
  created_date: string; // ISO date string
  description?: string;
}

export interface Project {
  id: number;
  name: string;
  ownerId: number;
  status: "In Progress" | "Completed" | "Pending"; // adjust as needed
  created_date: string;
  tasks: Task[];
  progress: number;
  taskCount?: number; // optional, since not all projects have it
}

// Example type for an array of projects
export type ProjectList = Project[];