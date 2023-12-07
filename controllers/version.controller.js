import Version from "../models/version.model.js";
export const createVersion = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Version.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Version Name Already Exists", {
        cause: { status: 400 },
      });
    }

    const newVersion = await Version.create({
      name,
      status: "Active",
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " Version created successfully",
      newVersion,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchVersion = async (req, res, next) => {
  try {
    const versions = await Version.find();
    res.status(200).json({
      status: "success",
      message: " Versions fetched successfully",
      versions,
    });
  } catch (error) {
    next(error);
  }
};
export const updateVersion = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const id = req.params.id;
    const isExist = await Board.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist && !isExist._id.equals(id)) {
      throw new Error("Board Name Already Exists", {
        cause: { status: 400 },
      });
    }
    const updatedVersion = await Version.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Version updated successfully",
      updatedVersion,
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
      status = "Inactive";
    } else if (status === "Inactive") {
      status = "Active";
    }
    const version = await Version.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Subject updated successfully",
      version,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteVersion = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Version.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Version deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
