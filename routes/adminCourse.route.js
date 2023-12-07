import express from "express";
const router = express.Router();

import {
  addAdminCourse,
  updateAdminCourse,
  fetchAllAdminCourse,
  fetchAdminCourseByUserId,
  bulkUpdateAdminCourse,
} from "../controllers/adminCourse.controller.js";
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

router.post("/", isUser, isAdmin, addAdminCourse);
router.get("/", isUser, isAdmin, fetchAllAdminCourse);
router.put("/update", isUser, isAdmin, bulkUpdateAdminCourse);
router.get("/:userId", isUser, isAdmin, fetchAdminCourseByUserId);
router.put("/:adminCourseId", isUser, isAdmin, updateAdminCourse);

export default router;
