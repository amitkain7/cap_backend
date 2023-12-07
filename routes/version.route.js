import express from "express";
const router = express.Router();
import { isUser } from "../middlewares/auth.middleware.js";

import { createVersion, deleteVersion, fetchVersion, inactiveStatus, updateVersion } from "../controllers/version.controller.js";
router.post('/create',isUser,createVersion)
router.patch('/update/:id',isUser,updateVersion)
router.patch("/inactive/status/:id",isUser, inactiveStatus);

router.get('/read',isUser,fetchVersion)
router.delete('/delete/:id',isUser,deleteVersion)
export default router;