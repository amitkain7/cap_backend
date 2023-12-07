import express from "express";
const router = express.Router();

import {
  createTopic,
  deleteTopic,
  fetchTopic,
  fetchTopicById,
  updateTopic,
} from "../controllers/topic.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";
import { validateMongoId } from "../utils/custom-validators.js";
import validateReq from "../middlewares/validate-req.js";

router.post("/create", isUser, createTopic);
router.patch("/update/:id", isUser, updateTopic);
router.get("/read/:courseId/:topicId", fetchTopicById);
router.get("/read/:courseId", fetchTopic);
router.delete("/delete/:id", validateMongoId("id"), validateReq, deleteTopic);
export default router;
