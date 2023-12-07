import express from "express";
const router = express.Router();
import {
  createInstituteType,
  deleteInstitutetype,
  fetchInstituteType,
  inactiveStatus,
  updateInstituteType,
} from "../controllers/instituteType.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

router.post("/create", isUser, createInstituteType);
router.patch("/update/:id",isUser, updateInstituteType);
router.patch("/inactive/status/:id",isUser, inactiveStatus);
router.get("/read", isUser, fetchInstituteType);
router.delete("/delete/:id",isUser, deleteInstitutetype);
export default router;
