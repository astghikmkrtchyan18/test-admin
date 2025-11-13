import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useTeamStore } from "@/entities/team/model/store";
import type { Task } from "@/entities/project/model/types";
import ReactDOM from "react-dom";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, "id">) => void;
  onUpdate: (id: number, task: Partial<Task>) => void;
  task?: Task | null;
}

export function TaskModal({
  isOpen,
  task,
  onClose,
  onCreate,
  onUpdate,
}: TaskModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    assigned: 0,
    complete: false,
    end_date: "", 
  });

  const { team, fetchTeam } = useTeamStore();

  // Load team when modal opens
  useEffect(() => {
    if (isOpen) fetchTeam();
  }, [isOpen, fetchTeam]);

  // If editing an existing task, prefill the form
  useEffect(() => {
    if (task) {
      setForm({
        name: task.name || "",
        description: task.description || "",
        assigned: task.assigned || 0,
        complete: task.complete || false,
        end_date: task.end_date
          ? task.end_date.split("T")[0]
          : "", // show only YYYY-MM-DD
      });
    } else {
      setForm({
        name: "",
        description: "",
        assigned: 0,
        complete: false,
        end_date: "",
      });
    }
  }, [task, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "assigned"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (task) {
      // ✅ Update existing task
      onUpdate(task.id, form);
    } else {
      // ✅ Create new task
      onCreate({
        ...form,
        created_date: new Date().toISOString(),
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!task;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 -translate-y-1/2 inset-0 z-50 h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
          {isEditing ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Task Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Add details..."
            />
          </div>

          {/* Assigned User */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Assigned User
            </label>
            <select
              name="assigned"
              value={form.assigned}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value={0} disabled>
                Select a team member
              </option>
              {team.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Deadline Date */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              Deadline Date
            </label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Completed Checkbox (only for edit mode) */}
          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="complete"
                name="complete"
                checked={form.complete}
                onChange={handleChange}
                className="w-4 h-4 accent-emerald-500"
              />
              <label
                htmlFor="complete"
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                Mark as completed
              </label>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl font-medium text-white transition-all ${
                isEditing
                  ? "bg-linear-to-r from-emerald-500 to-green-600 hover:shadow-md"
                  : "bg-linear-to-r from-blue-500 to-purple-600 hover:shadow-md"
              }`}
            >
              {isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
}
