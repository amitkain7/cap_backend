import express from "express";
const router = express.Router();

import {
  createSubTopic,
  deleteSubTopic,
  fetchSubTopic,
  fetchSubTopicById,
  updateSubTopic,
} from "../controllers/subTopic.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";
import { validateMongoId } from "../utils/custom-validators.js";
import validateReq from "../middlewares/validate-req.js";

router.post("/create", isUser, createSubTopic);
router.patch("/update/:id", isUser, updateSubTopic);
router.get(
  "/read/by-id/:subTopicId",
  validateMongoId("subTopicId", true),
  validateReq,
  fetchSubTopicById
);
router.get("/read/:topicId", fetchSubTopic);
router.delete(
  "/delete/:id",
  validateMongoId("id"),
  validateReq,
  deleteSubTopic
);
export default router;
