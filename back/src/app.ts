import express from "express";
import cors from "cors";
import { menuRouter } from "./routes/menu.routes";
import { teamRouter } from "./routes/team.routes";
import { projectRouter } from "./routes/project.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "API is running 🚀" });
});

// Routes
app.use("/api/menu", menuRouter);
app.use("/api/team", teamRouter);
app.use("/api/projects", projectRouter);

