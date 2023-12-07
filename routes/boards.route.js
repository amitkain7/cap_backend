import express from "express";


import { createBoard, deleteBoard, fetchBoard, inactiveStatus,updateBoard } from "../controllers/boards.controller.js";
const router = express.Router();
import { isUser } from "../middlewares/auth.middleware.js";



router.post('/create',isUser,createBoard)
router.patch('/update/:id',isUser,updateBoard)
router.patch("/inactive/status/:id",isUser, inactiveStatus);

router.get('/read',isUser,fetchBoard)
router.delete('/delete/:id',isUser,deleteBoard)
export default router;