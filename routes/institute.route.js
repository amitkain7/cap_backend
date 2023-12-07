import express from "express";
const router = express.Router();

import {
  AddInstitute,
  FetchInstitutes,
  UpdateInstitute,
  DeleteInstitute,
  fetchFilterInstitute,
  searchInstitute,
  ToggleInstituteStatus
} from "../controllers/institute.controller.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";


router.post("/create", imageUpload.any("logo"), AddInstitute);
router.patch("/toggle/status/:id", ToggleInstituteStatus);
router.get("/read", FetchInstitutes);
router.put("/update/:id", imageUpload.any("logo"), UpdateInstitute);
router.delete("/delete/:id", DeleteInstitute);
router.get("/filter", fetchFilterInstitute);

router.get("/search/:text", searchInstitute);

export default router;
