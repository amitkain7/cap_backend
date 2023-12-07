import express from "express";
const router = express.Router();
import {
    CreateAdminSchool,
    FetchAdminSchool
} from "../controllers/capricsUsers.controller.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

router.post("/create", CreateAdminSchool);
router.get("/read", FetchAdminSchool);


export default router;
