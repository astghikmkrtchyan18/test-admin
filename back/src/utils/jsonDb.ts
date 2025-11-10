import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/projects.json");

export function readProjects() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function writeProjects(projects: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), "utf-8");
}
