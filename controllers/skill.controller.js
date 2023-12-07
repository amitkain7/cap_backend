import Skill from "../models/skill.model.js";
export const createSkill = async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Skill.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist) {
      throw new Error("Skill Already Exists", {
        cause: { status: 400 },
      });
    }
    const newSkill = await Skill.create({
      name,
      status: "Active",
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileName: req.file.filename,
      createdBy: req.user._id,
    });
    await newSkill.save();
    res.status(201).json({
      status: "success",
      message: " Skill created successfully",
      newSkill,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchSkill = async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      status: "success",
      message: " Skills fetched successfully",
      skills,
    });
  } catch (error) {
    next(error);
  }
};
export const updateSkill = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, status } = req.body;
    const isExist = await Skill.findOne({
      name: { $regex: new RegExp(name, "i") },
    });

    if (isExist && !isExist._id.equals(id)) {
      throw new Error("Skill Already Exists", {
        cause: { status: 400 },
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
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
      message: " Skill updated successfully",
      updatedSkill,
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
    const skill = await Skill.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteSkill = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Skill.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
