import { useEffect } from "react";
import { StatsGrid } from "@/shared/ui/StatsGrid";
import { useNavigate } from "react-router";
import { useProjectStore } from "@/entities/project/model/store";
import { useNotificationStore } from "@/entities/notification/model/store";

import { AddProjectButton } from "@/features/project-actions/ui/AddProjectButton";
import { ProjectTable } from "@/widgets/project-table/ui/ProjectTable";

export function DashboardPage() {
  const navigate = useNavigate();
  const { projects, fetchProjects, loading } = useProjectStore();
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading)
    return <div className="p-6 text-slate-500">Loading...</div>;

  return (
    <div className="p-6 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      <StatsGrid />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          Project Dashboard
        </h2>

        <AddProjectButton onAdded={fetchNotifications} />
      </div>

      <ProjectTable
        projects={projects}
        onNavigate={id => navigate(`/projects/${id}`)}
        onActionsDone={fetchNotifications}
      />
    </div>
  );
}
