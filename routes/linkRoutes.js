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


router.get("/healthz", healthz);


router.post("/api/links", createLink);
router.get("/api/links", getLinks);
router.get("/code/:code", getLinkStats);
router.delete("/api/links/:code", deleteLink);
router.get("/:code", handleRedirect);

export default router;
