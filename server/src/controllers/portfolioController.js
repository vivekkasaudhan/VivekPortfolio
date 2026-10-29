import { portfolioData } from "../data/portfolioData.js";

export const getPortfolio = (_req, res) => {
  res.status(200).json({
    success: true,
    data: portfolioData
  });
};

export const getProjects = (_req, res) => {
  res.status(200).json({
    success: true,
    data: portfolioData.projects
  });
};
