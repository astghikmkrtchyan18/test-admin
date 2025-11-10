import { Router } from "express";
import { teamData } from "../data/team";

export const teamRouter = Router();

teamRouter.get("/", (_, res) => {
  res.json(teamData);
});

teamRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const member = teamData.find((t) => t.id === id);
  if (!member) return res.status(404).json({ error: "Member not found" });
  res.json(member);
});
