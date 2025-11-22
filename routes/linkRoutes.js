import express from "express";
import {
  healthz,
  createLink,
  getLinks,
  getLinkStats,
  deleteLink,
  handleRedirect
} from "../controllers/linkController.js";

const router = express.Router();

// HEALTH
router.get("/healthz", healthz);

// API ROUTES
router.post("/api/links", createLink);
router.get("/api/links", getLinks);
router.get("/api/links/:code", getLinkStats);
router.delete("/api/links/:code", deleteLink);

// REDIRECT ROUTE
router.get("/:code", handleRedirect);

export default router;
