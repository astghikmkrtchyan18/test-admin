import { ProjectTableRow } from "./ProjectTableRow";
import type { Project } from "@/entities/project/model/types";

export function ProjectTable({
  projects,
  onNavigate,
  onActionsDone,
}: {
  projects: Project[];
  onNavigate: (id: number) => void;
  onActionsDone: () => void;
}) {
  return (
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
            <ProjectTableRow
              key={p.id}
              project={p}
              index={i}
              onNavigate={onNavigate}
              onActionsDone={onActionsDone}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
