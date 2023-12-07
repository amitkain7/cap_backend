import BundlePricing from "../models/bundlePricing.model.js";

export const addBundlePricing = async (req, res, next) => {
    try {
        const data = await BundlePricing.create({
            ...req.body,
            addedBy: req.user._id,
            updatedBy: req.user._id
        });
        console.log(data);
        res.status(201).json({
            message: "BundlePricing created successfully.",
            status: "success",
            data
        });
    } catch (error) {
        next(error)
    }
}

export const getBundlePricing = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await BundlePricing.findById(id);
        res.status(200).json({
            message: "BundlePricing found successfully.",
            status: "success",
            data
        })
    } catch (error) {
        next(error)
    }
}