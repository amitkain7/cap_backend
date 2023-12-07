import express from "express";
const router = express.Router();

import {
  createSubject,
  deleteSubject,
  fetchSubject,
  updateSubject,
  inactiveStatus,
  fetchSubjectByClassId,
} from "../controllers/subject.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

router.post("/create", isUser, createSubject);
router.patch("/update/:id", isUser, updateSubject);
router.patch("/inactive/status/:id", isUser, inactiveStatus);

router.get("/read", isUser, fetchSubject);
router.get("/read/:classId", isUser, fetchSubjectByClassId);
router.delete("/delete/:id", isUser, deleteSubject);
export default router;
