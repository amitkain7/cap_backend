import express from "express";
import validateReq from "../middlewares/validate-req.js";
import {
  addTab,
  editTab,
  fetchTabs,
} from "../controllers/sub-topic-tab.controller.js";
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";
import { validateMongoId } from "../utils/custom-validators.js";

const router = express.Router();

router.post(
  "/",
  isUser,
  validateMongoId("subTopicId", true),
  validateReq,
  addTab
);
router.put("/", isUser, validateMongoId("tabId", true), validateReq, editTab);

router.get(
  "/all/:subTopicId",
  validateMongoId("subTopicId", true),
  validateReq,
  fetchTabs
);
export default router;
