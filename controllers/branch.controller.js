import mongoose from "mongoose";
import Branch from "../models/branch.model.js";
import Institute from "../models/institute.model.js";

export const CreateBranch = async (req, res, next) => {
  try {
    // const {branch, logo, address, status, isPrimary, }

    const logoFileName = req.files?.[0]?.filename;

    const institute = await Institute.findById({ _id: req.body.instituteId });

    await Branch.create({
      ...req.body,
      logo: logoFileName,
      status: req.body.status === "true" ? "Active" : "InActive",
      entityId: institute?.entityId,
      createdBy: req.user._id,
    });

    res.json({
      message: "Branch Created",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const FetchBranches = async (req, res, next) => {
  try {
    const branches = await Branch.getBranches(req.user._id)

    res.json({
      message: "Branches fetch succesfully",
      branches,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UpdateBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uploadedLogoFileName = req.files[0]?.filename;

    const updateObj = {
      $set: {
        ...req.body,
        status: req.body.status === "true" ? "Active" : "InActive",
      },
    };

    if (uploadedLogoFileName) updateObj.$set.logo = uploadedLogoFileName;

    res.json({
      updatedInstitute: await Branch.findByIdAndUpdate(
        { _id: id },
        {
          ...updateObj,
        },
        { new: true }
      ),
      message: "Institute Updated Success",
    });
  } catch (error) {}
};

export const ToggleBranchStatus = async (req, res, next) => {
  try {
    const branchDocId = req.params.id;
    // if isActive true than we set status to "Active" else "InActive"
    const { isActive } = req.body;

    if (!mongoose.isValidObjectId(branchDocId))
      throw new Error("Invalid entity.", {
        cause: { status: 400 },
      });

    const branch = await Branch.findByIdAndUpdate(
      { _id: branchDocId },
      { $set: { status: !isActive ? "Active" : "InActive" } },
      { new: true }
    );
    if (!branch)
      throw new Error("No branch found.", {
        cause: { status: 400 },
      });

    res.json({
      message: "Status Changed",
      updatedBranch: branch,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteBranch = async (req, res, next) => {
  try {
    await Branch.findByIdAndDelete({ _id: req.params.id });
    res.json({
      message: "Deleted Sucess",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchFilterBranch = async (req, res, next) => {
  try {
    const query = req.query;

    for (let key in query) {
      if (mongoose.isValidObjectId(query[key]))
        query[key] = new mongoose.Types.ObjectId(query[key]);
      else if(key === "isCapricsOffer")
        query[key] = Boolean(+req.query[key])
    }

    const branches = await Branch.getBranches(req.user._id, query)

    res.status(200).json({
      status: "success",
      message: " Course filter successfully",
      branches,
    });
  } catch (error) {
    next(error);
  }
};

export const searchBranch = async (req, res, next) => {
  try {
    const searchText = req.params.text;

    const regex = new RegExp(searchText, "i"); // 'i' makes the search case-insensitive

    const branches = await Branch.getBranches(req.user._id, {$or: [{ name: { $regex: regex } }]})
    
    res.json({
      branches,
    });
  } catch (error) {
    next(error);
  }
};
