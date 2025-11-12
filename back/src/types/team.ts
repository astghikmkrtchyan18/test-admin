export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  online: boolean;
}

// Example type for an array of members
export type TeamList = TeamMember[];