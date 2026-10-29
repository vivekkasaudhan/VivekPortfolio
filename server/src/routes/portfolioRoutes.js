import { Router } from "express";
import { getPortfolio, getProjects } from "../controllers/portfolioController.js";

const router = Router();

router.get("/", getPortfolio);
router.get("/projects", getProjects);

export default router;
