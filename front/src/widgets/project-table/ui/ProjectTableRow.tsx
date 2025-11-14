import { Pencil, Trash2 } from "lucide-react";
import { useProjectStore } from "@/entities/project/model/store";
import type { Project } from "@/entities/project/model/types";

export function ProjectTableRow({
  project,
  index,
  onNavigate,
  onActionsDone,
}: {
  project: Project;
  index: number;
  onNavigate: (id: number) => void;
  onActionsDone: () => void;
}) {
  const { editProgress, deleteProject } = useProjectStore();

  const handleEditProgress = async () => {
    const newValue = prompt("Enter new progress (0–100):");
    if (newValue !== null) {
      const v = Math.min(100, Math.max(0, parseInt(newValue)));
      await editProgress(project.id, v);
      onActionsDone();
    }
  };

  const handleDelete = async () => {
    if (confirm("Delete this project?")) {
      await deleteProject(project.id);
    }
  };

  return (
    <tr
      onClick={() => onNavigate(project.id)}
      className={`border-b border-slate-200/30 dark:border-slate-700/30 ${
        index % 2 === 0
          ? "bg-white/60 dark:bg-slate-900/60"
          : "bg-white/40 dark:bg-slate-800/40"
      } hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all cursor-pointer`}
    >
      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
        {project.name}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
            project.status === "Completed"
              ? "bg-emerald-500/20 text-emerald-500"
              : "bg-amber-500/20 text-amber-500"
          }`}
        >
          {project.status}
        </span>
      </td>

      <td className="px-4 py-3 w-48">
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${project.progress >= 100 ? "bg-emerald-500" : "bg-blue-500"}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
          {project.progress}%
        </span>
      </td>

      <td
        onClick={(e) => e.stopPropagation()}
        className="px-4 py-3 text-right flex justify-end gap-2"
      >
        <button
          onClick={handleEditProgress}
          className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-500 transition-all"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-500 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
