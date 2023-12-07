import express from "express";
const router = express.Router();
import { AddEntity, FetchEntities, ToggleEntityStatus, UpdateEntity, SearchEntity } from "../controllers/entity.controller.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

router.post("/create", imageUpload.any("logo"),  AddEntity);
router.patch("/toggle/status/:id", ToggleEntityStatus);
router.get("/read", FetchEntities);
router.put("/update/:id", imageUpload.any("logo"), UpdateEntity);

router.get("/search/:text", SearchEntity)

export default router;
