import express from "express";
const router = express.Router();

import {  createCourseAccess,deleteCourseAccess,fetchCourseAccess} from "../controllers/courseAccess.controller.js";

router.post('/create',createCourseAccess)
router.get('/read/:id',fetchCourseAccess)
router.delete('/delete/:id',deleteCourseAccess)
export default router;