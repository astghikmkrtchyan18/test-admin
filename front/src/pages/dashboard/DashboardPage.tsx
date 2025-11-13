import { useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useProjectStore } from "@/entities/project/model/store";
import { useNavigate } from "react-router";
import { StatsGrid } from "@/shared/ui/StatsGrid";
import { useNotificationStore } from "@/entities/notification/model/store";

export function DashboardPage() {
    const navigate = useNavigate();
  const {
    projects,
    fetchProjects,
    addProject,
    editProgress,
    deleteProject,
    loading,
  } = useProjectStore();
  const { fetchNotifications } = useNotificationStore();
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = async () => {
    const newName = prompt("Enter project name:");
    if (newName) {
      await addProject(newName);
      await fetchNotifications();
    }
  };

  const handleEditProgress = async (id: number) => {
    const newProgress = prompt("Enter new progress (0–100):");
    if (newProgress !== null) {
      const value = Math.min(100, Math.max(0, parseInt(newProgress)));
      await editProgress(id, value);
      await fetchNotifications();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this project?")) await deleteProject(id);
  };

  if (loading) return <div className="p-6 text-slate-500">Loading...</div>;

  return (
    <div className="p-6 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
    <StatsGrid/>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Project Dashboard
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-100/50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 rounded-tl-xl">Project Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3 text-right rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/projects/${p.id}`)}
                className={`border-b border-slate-200/30 dark:border-slate-700/30 ${
                  i % 2 === 0
                    ? "bg-white/60 dark:bg-slate-900/60"
                    : "bg-white/40 dark:bg-slate-800/40"
                } hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all cursor-pointer`}
              >
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                  {p.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      p.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-amber-500/20 text-amber-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 w-48">
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${
                        p.progress >= 100
                          ? "bg-emerald-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                    {p.progress}%
                  </span>
                </td>
                <td
                onClick={(e) => {e.stopPropagation()}}
                className="px-4 py-3 text-right flex justify-end gap-2" >
                  <button
                    onClick={() => handleEditProgress(p.id)}
                    className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-500 transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
