import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { CheckCircle2, Circle, Plus, Pencil, Trash2 } from "lucide-react";
import { useProjectStore } from "@/entities/project/model/store";
import { TaskModal } from "./TaskModal";
import type { Task } from "@/entities/project/model/types";

export const ProjectDetailsPage = () => {
  const { fetchProjects, projects, toggleTask, addTask, updateTask, deleteTask } =    
    useProjectStore();
  const { id } = useParams();
  const projectId = Number(id);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const project = projects.find((p) => p.id === projectId);

  const handleCreate = (task: Omit<Task, "id">) => {
    addTask(projectId, task);
  };

  const handleEditTask = (id: number, task: Partial<Task>) => {
      updateTask(projectId, id, task);
      setEditingTask(null);
      setOpen(false);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setOpen(true);
  }
  const closeModal = () => {
    setEditingTask(null);
    setOpen(false);
  }

  const handleDeleteTask = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(projectId, taskId);
    }
  };

  if (!project) return <p className="text-slate-500">Project not found.</p>;

  const completed = project.tasks.filter((t) => t.complete).length;
  const progress =
    project.tasks.length === 0
      ? 0
      : Math.round((completed / project.tasks.length) * 100);

  return (
    <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{project.name}</h2>
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-emerald-500 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Status:{" "}
            <span
              className={`font-semibold ${
                progress === 100 ? "text-emerald-500" : "text-amber-500"
              }`}
            >
              {progress === 100 ? "Completed" : "In Progress"}
            </span>
          </span>
          <span className="text-sm">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
          <div
            className={`h-2 ${
              progress === 100 ? "bg-emerald-500" : "bg-blue-500"
            } rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Task section header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {project.tasks.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-700/60 transition-all"
          >
            <div className="flex items-center gap-2">
              <button onClick={() => toggleTask(projectId, t.id)}>
                {t.complete ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <span
                className={`${
                  t.complete
                    ? "line-through text-slate-400"
                    : "text-slate-800 dark:text-slate-200"
                }`}
              >
                {t.name}
              </span>
            </div>

            {/* Edit/Delete buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEditModal(t)}
                className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-500 transition-all"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteTask(t.id)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-500 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Task creation modal */}
      <TaskModal
        isOpen={open}
        onClose={() => closeModal()}
        onUpdate= {handleEditTask}
        onCreate={handleCreate}
        task={editingTask}
      />
    </div>
  );
};
