import { Plus } from "lucide-react";
import { useProjectStore } from "@/entities/project/model/store";

export function AddProjectButton({ onAdded }: { onAdded: () => void }) {
  const { addProject } = useProjectStore();

  const handleAdd = async () => {
    const name = prompt("Enter project name:");
    if (name) {
      await addProject(name);
      onAdded();
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
    >
      <Plus className="w-4 h-4" />
      Add Project
    </button>
  );
}
