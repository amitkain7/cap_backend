import express from "express";
const router = express.Router();

import {
    addBundlePricing,
    getBundlePricing
} from "../controllers/bundlePricing.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

router.post('/create', isUser, addBundlePricing);
router.get('/read', isUser, getBundlePricing);

export default router;