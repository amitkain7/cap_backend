import Methodology from "../models/methodology.model.js";
export const createMethodology = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Methodology.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Methodology Name Already Exists", {
        cause: { status: 400 },
      });
    }
    const newMethodology = await Methodology.create({
      name,
      status: "Active",
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileName: req.file.filename,
      createdBy: req.user._id,
    });
    await newMethodology.save();
    res.status(201).json({
      status: "success",
      message: " Methodology created successfully",
      newMethodology,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchMethodology = async (req, res, next) => {
  try {
    const methodologies = await Methodology.find();
    res.status(200).json({
      status: "success",
      message: " Methodologies fetched successfully",
      methodologies,
    });
  } catch (error) {
    next(error);
  }
};
export const updateMethodology = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, status } = req.body;
    const isExist = await Methodology.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Methodology Name Already Exists", {
        cause: { status: 400 },
      });
    }
    const updatedMethodology = await Methodology.findByIdAndUpdate(
      id,
      {
        name,
        status,
        originalName: req.file?.originalname,
        filePath: req.file?.path,
        fileName: req.file?.filename,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Methodology updated successfully",
      updatedMethodology,
    });
  } catch (error) {
    next(error);
  }
};
export const inactiveStatus = async (req, res, next) => {
  const id = req.params.id;
  try {
    let status = req.body.status;
    if (status === "Active") {
      status = "Inactive";
    } else if (status === "Inactive") {
      status = "Active";
    }
    const m = await Methodology.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Methodology updated successfully",
      m,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteMethodology = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Methodology.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Methodology deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
