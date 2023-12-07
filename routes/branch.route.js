import express from "express";
const router = express.Router();
import {
    CreateBranch,
    FetchBranches,
    UpdateBranch,
    ToggleBranchStatus,
    DeleteBranch,
    fetchFilterBranch,
    searchBranch
} from "../controllers/branch.controller.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

router.post("/create", imageUpload.any("logo"), CreateBranch);
router.patch("/toggle/status/:id", ToggleBranchStatus);
router.get("/read", FetchBranches);
router.put("/update/:id", imageUpload.any("logo"), UpdateBranch);
router.delete("/delete/:id", DeleteBranch);
router.get("/filter", fetchFilterBranch);

router.get("/search/:text", searchBranch);

export default router;
