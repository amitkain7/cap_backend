import Subject from "../models/subject.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";

export const createSubject = async (req, res, next) => {
  try {
    const { name, classId, subjectCode, colorCode, courseCategoryId } =
      req.body;
    const isExist = await Subject.findOne({ name, classId });
    if (isExist) {
      throw new Error("Subject already exists with that name", {
        cause: { status: 400 },
      });
    }
    const user = await User.findById(req.user._id);

    const newSubject = await Subject.create({
      name,
      status: "Active",
      classId,
      subjectCode,
      colorCode,
      courseCategoryId,
      createdByName: `${user.fName} ${user.lName}`,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " Subject created successfully",
      newSubject,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchSubject = async (req, res, next) => {
  try {
    const subjects = await Subject.find({}).populate({
      path: "classId",
      populate: {
        path: "boardId",
      },
    });
    res.status(200).json({
      status: "success",
      message: " Subjects fetched successfully",
      subjects,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchSubjectByClassId = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ classId: req.params.classId });
    res.status(200).json({
      status: "success",
      message: " Subjects fetched successfully",
      subjects,
    });
  } catch (error) {
    next(error);
  }
};
export const updateSubject = async (req, res, next) => {
  const { name, status, classId, subjectCode, colorCode, courseCategoryId } =
    req.body;

  const id = req.params.id;
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { name, status, classId, subjectCode, colorCode, courseCategoryId },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Subject updated successfully",
      updatedSubject,
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
    const sub = await Subject.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Subject updated successfully",
      sub,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteSubject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hasCourses = await Course.find({ subjectId: id }).countDocuments();
    if (hasCourses) {
      throw new Error("Unable to delete subject, contains courses", {
        cause: { status: 400 },
      });
    }
    await Subject.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Subject deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
