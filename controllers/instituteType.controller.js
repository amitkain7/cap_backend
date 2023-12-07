import Institutetype from "../models/instituteType.model.js";

export const createInstituteType = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Institutetype.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Institute Type Name Already Exists", {
        cause: { status: 400 },
      });
    }
    const newInstituteType = await Institutetype.create({
      name,
      status: "Active",
      createdBy: req.user._id,
    });
    await newInstituteType.save();
    res.status(201).json({
      status: "success",
      message: " Institutetype created successfully",
      newInstituteType,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchInstituteType = async (req, res, next) => {
  try {
    const instituteTypes = await Institutetype.find();
    res.status(200).json({
      status: "success",
      message: " Institutetypes fetched successfully",
      instituteTypes,
    });
  } catch (error) {
    next(error);
  }
};
export const updateInstituteType = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, status } = req.body;
    const isExist = await Institutetype.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Institute Type Name Already Exists", {
        cause: { status: 400 },
      });
    }
    const updatedInstituteType = await Institutetype.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Institutetype updated successfully",
      updatedInstituteType,
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
    const updatedInstituteType = await Institutetype.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Institutetype updated successfully",
      updatedInstituteType,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteInstitutetype = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Institutetype.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Institutetype deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
