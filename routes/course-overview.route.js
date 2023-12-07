import express from "express";
const router = express.Router();

import {
  createCourseOverview,
  fetchCourseOverview,
  fetchFilterCourseOverview,
  deleteCourseOverview,
  updateCourseOverview
} from "../controllers/course-overview.controller.js";

import { isUser } from "../middlewares/auth.middleware.js";

router.post("/create", isUser, createCourseOverview);
router.get("/read",isUser, fetchCourseOverview);
router.get("/filter",isUser, fetchFilterCourseOverview);
router.delete("/delete/:id", isUser, deleteCourseOverview)
router.put("/edit/:id", isUser, updateCourseOverview)

// router.patch("/update/:id", isUser, uploadStorage.single("file"),updateCourse);
// router.patch("/inactive/status/:id",isUser, inactiveStatus);
// router.get("/read/category/:categoryId",isUser, fetchCourseByCategoryId);
// router.get("/read/:subjectId",isUser, fetchCourseBySubjectId);
// router.delete("/delete/:id",isUser, deleteCourse);


export default router;
