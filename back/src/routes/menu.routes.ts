import { Router } from "express";
import { menuData } from "../data/menu";

export const menuRouter = Router();

menuRouter.get("/", (_, res) => {
  res.json(menuData);
});
