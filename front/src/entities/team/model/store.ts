import { create } from "zustand";

export type TeamMember = {
  id: number;
  name: string;
  tasks: number;
};

interface TeamStore {
  team: TeamMember[];
  fetchTeam: () => void;
  addMember: (name: string) => void;
  removeMember: (id: number) => void;
  updateTasks: (id: number, tasks: number) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  team: [],
  fetchTeam: () =>
    set({
      team: [
        { id: 1, name: "Alice Johnson", tasks: 2 },
        { id: 2, name: "Bob Smith", tasks: 5 },
        { id: 3, name: "Carol Davis", tasks: 7 },
        { id: 4, name: "David Lee", tasks: 1 },
      ],
    }),
  addMember: (name) =>
    set((state) => ({
      team: [...state.team, { id: Date.now(), name, tasks: 0 }],
    })),
  removeMember: (id) =>
    set((state) => ({
      team: state.team.filter((m) => m.id !== id),
    })),
  updateTasks: (id, tasks) =>
    set((state) => ({
      team: state.team.map((m) => (m.id === id ? { ...m, tasks } : m)),
    })),
}));
