import { useEffect } from "react";
import { Link } from "react-router";
import { useTeamStore } from "@/entities/team";

export const TeamPage = () => {
  const { team, fetchTeam, updateTasks, addMember, removeMember } =
    useTeamStore();

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const getColor = (count: number) => {
    if (count < 3) return "bg-emerald-500";
    if (count <= 5) return "bg-amber-500";
    return "bg-red-500";
  };

  const getPercent = (count: number) => Math.min((count / 5) * 100, 100);

  const handleAddMember = () => {
    const name = prompt("Enter member name:");
    if (name) addMember(name);
  };

  const handleUpdateTasks = (memberId: number) => {
    const value = prompt("Enter task count:");
    if (value !== null) {
      const tasks = Math.max(0, parseInt(value));
      updateTasks(memberId, tasks);
    }
  };

  const handleRemoveMember = (id: number) => {
    if (window.confirm("Remove this member?")) removeMember(id);
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Team Overview</h2>
        <div className="flex gap-4">
          <button
            onClick={handleAddMember}
            className="text-sm text-emerald-500 hover:text-emerald-400 transition"
          >
            + Add Member
          </button>
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-emerald-500 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <table className="min-w-full text-sm text-left">
        <thead className="bg-slate-100/50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 rounded-tl-xl">Member</th>
            <th className="px-4 py-3">Tasks</th>
            <th className="px-4 py-3 rounded-tr-xl">Capacity</th>
            <th className="px-4 py-3 rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {team.map((m: any, i: number) => (
            <tr
              key={m.id}
              className={`border-b border-slate-200/30 dark:border-slate-700/30 ${
                i % 2 === 0
                  ? "bg-white/60 dark:bg-slate-900/60"
                  : "bg-white/40 dark:bg-slate-800/40"
              } hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all`}
            >
              <td className="px-4 py-3 font-medium">{m.name}</td>
              <td className="px-4 py-3">{m.tasks}</td>
              <td className="px-4 py-3 w-48">
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${getColor(m.tasks)}`}
                    style={{ width: `${getPercent(m.tasks)}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                  {getPercent(m.tasks)}%
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => handleUpdateTasks(m.id)}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveMember(m.id)}
                  className="text-sm text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
