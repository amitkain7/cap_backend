import express from "express";
const router = express.Router();

import {
  addAdminSubject,
  updateAdminSubject,
  fetchAllAdminSubject,
  fetchAdminSubjectByUserId,
  bulkUpdateAdminSubject,
} from "../controllers/adminSubject.controller.js";
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

router.post("/", isUser, isAdmin, addAdminSubject);
router.get("/", isUser, isAdmin, fetchAllAdminSubject);
router.put("/update", isUser, isAdmin, bulkUpdateAdminSubject);
router.get("/:userId", isUser, isAdmin, fetchAdminSubjectByUserId);
router.put("/:adminSubjectId", isUser, isAdmin, updateAdminSubject);

export default router;
