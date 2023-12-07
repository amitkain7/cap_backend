import express from "express";
const router = express.Router();

import {
  createTaxonomy,
  deleteTaxonomy,
  fetchTaxonomy,
  updateTaxonomy,
  inactiveStatus,
  fetchTaxonomyById,
} from "../controllers/taxonomy.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

import { imageUpload } from "../middlewares/image-upload.middleware.js";
import validateReq from "../middlewares/validate-req.js";
import { validateColor, validateString } from "../utils/custom-validators.js";

router.post(
  "/create",
  isUser,
  imageUpload.single("file"),
  imageUpload._handleError,
  [
    validateString("name", { required: true }),
    validateColor("colorCode", true),
  ],
  validateReq.withImage,
  createTaxonomy
);
router.patch(
  "/update/:id",
  isUser,
  imageUpload.single("file"),
  imageUpload._handleError,
  updateTaxonomy
);
router.get("/read", fetchTaxonomy);
router.get("/read/:taxonomyId", fetchTaxonomyById);
router.patch("/inactive/status/:id", isUser, inactiveStatus);

router.delete("/delete/:id", isUser, deleteTaxonomy);
export default router;
