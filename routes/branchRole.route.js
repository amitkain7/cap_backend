import express from "express";
import BranchRole from "../models/branchRole.model.js"

const router = express.Router();

router.get("/read", async (req, res, next) => {
    try {
        res.json({
            message: "Branch Roles Fetched",
            branchRoles: await BranchRole.find()
        })
    } catch (error) {
        next(error)
    }
});
router.post("/create", async (req, res, next) => {
    try {
        res.json({
            message: "Branch Role Created",
            branchRoles: await BranchRole.create({
                ...req.body,
                createdBy: req.user._id
            })
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
});

export default router;
