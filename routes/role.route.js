import express from "express";
const router = express.Router();

import {
  addRole,
  fetchAllRole,
  updateRole,
} from "../controllers/role.controller.js";
import { isAdmin, isUser } from "../middlewares/auth.middleware.js";

router.post("/", isUser, isAdmin, addRole);
router.get("/", isUser, fetchAllRole);
router.put("/:roleId", isUser, isAdmin, updateRole);

export default router;
