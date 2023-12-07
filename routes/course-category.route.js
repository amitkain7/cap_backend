import express from "express";
const router = express.Router();

import {
  createCourseCategory,
  deleteCourseCategory,
  fetchCourseCategory,
  updateCourseCategory,
  inactiveStatus,
} from "../controllers/course-category.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

router.post("/create", isUser, createCourseCategory);
router.patch("/update/:id", isUser, updateCourseCategory);
router.patch("/inactive/status/:id", isUser, inactiveStatus);
router.get("/read", isUser, fetchCourseCategory);
router.delete("/delete/:id", isUser, deleteCourseCategory);
export default router;
