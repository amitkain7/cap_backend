import express from "express";
const router = express.Router();

import {
  createSkill,
  inactiveStatus,
  deleteSkill,
  fetchSkill,
  updateSkill,
} from "../controllers/skill.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const filePath = path.join(path.dirname(__dirname), "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadStorage = multer({ storage: storage });
router.post("/create", isUser, uploadStorage.single("file"), createSkill);
router.patch("/update/:id", isUser, uploadStorage.single("file"), updateSkill);
router.patch("/inactive/status/:id", isUser, inactiveStatus);
router.get("/read", isUser, fetchSkill);
router.delete("/delete/:id", isUser, deleteSkill);
export default router;
