import express from "express";
const router = express.Router();

import { createClass, deleteClass, fetchClassById,fetchClass,fetchClassByBoardId, inactiveStatus, updateClass } from "../controllers/class.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";


router.post('/create',isUser,createClass)
router.patch('/update/:id',isUser,updateClass)
router.patch("/inactive/status/:id",isUser, inactiveStatus);

router.get('/read',isUser,fetchClass)
router.get('/read/single/:id',isUser,fetchClassById)
router.get('/read/:boardId',isUser,fetchClassByBoardId)
router.delete('/delete/:id',isUser,deleteClass)
export default router;