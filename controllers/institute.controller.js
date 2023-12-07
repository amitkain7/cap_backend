import mongoose from "mongoose";
import Institute from "../models/institute.model.js";
import User from "../models/user.model.js";
import Branch from "../models/branch.model.js";

export const AddInstitute = async (req, res, next) => {
  try {
    const uploadedLogoFileName = req.files[0]?.filename;

    if (await Institute.exists({ email: req.body.email }))
      throw new Error("Institute already exists.");

    const newInstitute = await Institute.create({
      ...req.body,
      logo: uploadedLogoFileName, // this is optional
      createdBy: req.user._id,
    });

    res.json({
      newInstitute,
      message: "Institute Created Success",
    });
  } catch (error) {
    next(error);
  }
};

export const FetchInstitutes = async (req, res, next) => {
  try {
    res.json({
      institutes: await Institute.getInstitutes(req.user._id),
      message: "Institute Fetched",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UpdateInstitute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uploadedLogoFileName = req.files[0]?.filename;

    const updateObj = {
      $set: { ...req.body },
    };

    if (uploadedLogoFileName) updateObj.$set.logo = uploadedLogoFileName;

    const updatedInstitute = await Institute.findByIdAndUpdate(
      { _id: id },
      {
        ...updateObj,
      },
      { new: true }
    );

    await Branch.updateMany(
      { instituteId: updatedInstitute._id },
      {
        $set: { entityId: updatedInstitute.entityId },
      }
    );

    res.json({
      updatedInstitute,
      message: "Institute Updated Success",
    });
  } catch (error) {}
};

export const DeleteInstitute = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    // Delete the Institute
    await Institute.findByIdAndDelete(req.params.id);
    // .session(session);

    // Delete related Branches
    await Branch.deleteMany({ instituteId: req.params.id });
    // .session(session);

    // If everything is successful, commit the transaction
    // await session.commitTransaction();

    // End the session
    // session.endSession();

    res.json({
      message: "Delete Successfully",
    });
  } catch (error) {
    // If an error occurs, abort the transaction and handle the error
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

export const fetchFilterInstitute = async (req, res, next) => {
  try {
    const query = req.query;

    for (let key in query) {
      if (mongoose.isValidObjectId(query[key]))
        query[key] = new mongoose.Types.ObjectId(query[key]);
    }

    const institutes = await Institute.getInstitutes(req.user._id, query);

    res.status(200).json({
      status: "success",
      message: " Course filter successfully",
      institutes: institutes,
    });
  } catch (error) {
    next(error);
  }
};

export const ToggleInstituteStatus = async (req, res, next) => {
  try {
    const instituteDocId = req.params.id;
    // if isActive true than we set status to "Active" else "InActive"
    const { isActive } = req.body;

    if (!mongoose.isValidObjectId(instituteDocId))
      throw new Error("Invalid entity.", {
        cause: { status: 400 },
      });

    const institute = await Institute.findByIdAndUpdate(
      { _id: instituteDocId },
      { $set: { status: !isActive ? "Active" : "InActive" } },
      { new: true }
    );
    if (!institute)
      throw new Error("No institute found.", {
        cause: { status: 400 },
      });

    res.json({
      message: "Status Changed",
      updatedEntity: institute,
    });
  } catch (error) {
    next(error);
  }
};

export const searchInstitute = async (req, res, next) => {
  try {
    const searchText = req.params.text;

    const regex = new RegExp(searchText, "i"); // 'i' makes the search case-insensitive

    const institutes = await Institute.getInstitutes(req.user._id, {
      instituteName: { $regex: regex },
    });

    res.json({
      institutes,
    });
  } catch (error) {
    next(error);
  }
};
