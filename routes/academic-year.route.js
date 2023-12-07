import express from "express";
const router = express.Router();

import {
  createAcademicYear,
  deleteAcademicYear,
  fetchAcademicYear,
  updateAcademicYear,
  inactiveStatus,
} from "../controllers/academic-year.controller.js";
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

router.post("/create", isUser, isAdmin, createAcademicYear);
router.patch("/update/:id", isUser, isAdmin, updateAcademicYear);
router.patch("/inactive/status/:id", isUser, inactiveStatus);
router.get("/read", isUser, isAdmin, fetchAcademicYear);
router.delete("/delete/:id", isUser, isAdmin, deleteAcademicYear);
export default router;
