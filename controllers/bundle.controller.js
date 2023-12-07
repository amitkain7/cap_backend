import { imageUpload } from "../middlewares/image-upload.middleware.js";
import Bundle from "../models/bundle.model.js";

export const addBundle = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      name,
      description,
      boardId,
      classId,
      courseCategoryId,
      subjectId,
      accessibility,
      courses,
    } = req.body;

    const thumbnail = req.file.filename;
    const isExist = await Bundle.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      imageUpload._delete(thumbnail);

      throw new Error("Bundle Name Already Exists", {
        cause: { status: 400 },
      });
    }

    const data = await Bundle.create({
      name,
      description,
      thumbnail,
      boardId,
      classId,
      courseCategoryId,
      subjectId,
      accessibility,
      courses,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: "Bundle created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBundle = async (req, res, next) => {
  try {
    const { name, startDate, endDate, ...rest } = req.query;
    if (name) rest.name = new RegExp(name.trim(), "i");
    if (startDate && endDate)
      rest.createdAt = { $gte: startDate, $lte: endDate };

    const data = await Bundle.find(rest || {}).populate([
      "boardId",
      "classId",
      "courseCategoryId",
      "subjectId",
      "createdBy",
      "updatedBy",
    ]);
    res.status(200).json({
      status: "success",
      message: "Bundle fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updatedBundle = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, ...rest } = req.body;
    const isExist = await Bundle.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist && !isExist._id.equals(id)) {
      throw new Error("Skill Already Exists", {
        cause: { status: 400 },
      });
    }

    const updates = { name, updatedBy: req.user._id, ...rest };
    if (req.file) updates.thumbnail = req.file.fileName;

    const data = await Bundle.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: " Skill updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const inactiveStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    let status = req.body.status;
    if (status === "Active") {
      status = "InActive";
    } else if (status === "InActive") {
      status = "Active";
    }
    const data = await Bundle.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Bundle updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBundle = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Bundle.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Bundle deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const cloneBundle = async (req, res, next) => {
  try {
    const { name, bundleId } = req.body;

    const isExist = await Bundle.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Bundle Name Already Exists", {
        cause: { status: 400 },
      });
    }

    const {
      description,
      thumbnail,
      boardId,
      classId,
      courseCategoryId,
      subjectId,
      accessibility,
      courses,
    } = await Bundle.findById(bundleId);

    const data = await Bundle.create({
      name,
      description,
      thumbnail,
      boardId,
      classId,
      courseCategoryId,
      subjectId,
      accessibility,
      courses,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Bundle cloned successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
