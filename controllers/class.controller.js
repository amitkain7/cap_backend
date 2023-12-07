import Class from "../models/class.model.js";
import Subject from "../models/subject.model.js";
import User from "../models/user.model.js";

export const createClass = async (req, res, next) => {
  try {
    const { name, boardId } = req.body;
    const isExist = await Class.findOne({ name, boardId });
    if (isExist) {
      throw new Error("Class already exists with that name", {
        cause: { status: 400 },
      });
    }
    const user = await User.findById(req.user._id);

    const newClass = await Class.create({
      name,
      status: "Active",
      boardId,
      createdByName: `${user.fName} ${user.lName}`,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " Class created successfully",
      newClass,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchClass = async (req, res, next) => {
  try {
    const classes = await Class.find({}).populate("boardId");
    res.status(200).json({
      status: "success",
      message: " Classes fetched successfully",
      classes,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchClassById = async (req, res, next) => {
  try {
    const class1 = await Class.find({_id:req.params.id});
    res.status(200).json({
      status: "success",
      message: " Classes fetched successfully",
      class1,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchClassByBoardId = async (req, res, next) => {
  try {
    const classes = await Class.find({ boardId: req.params.boardId });
    res.status(200).json({
      status: "success",
      message: " Classes fetched successfully",
      classes,
    });
  } catch (error) {
    next(error);
  }
};
export const updateClass = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, status, boardId } = req.body;
    const isExist = await Class.findOne({ name, boardId });
    if (isExist) {
      throw new Error("Class already exists with that name", {
        cause: { status: 400 },
      });
    }
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, status, boardId },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Class updated successfully",
      updatedClass,
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
      status = "InActive";
    } else if (status === "InActive") {
      status = "Active";
    }
    const newCourseCategory = await Class.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Course Category updated successfully",
      newCourseCategory,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteClass = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hasSubjects = await Subject.find({ classId: id }).countDocuments();

    if (hasSubjects) {
      throw new Error("Unable to delete class, contains subjects", {
        cause: { status: 400 },
      });
    }
    await Class.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Class deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
