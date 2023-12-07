import mongoose from "mongoose";
import Course from "../models/course.model.js";

export const createCourse = async (req, res, next) => {
  const {
    boardId,
    classId,
    subjectId,
    courseCategoryId,
    versionId,
    name,
    modeOfDelivery,
    accessibility,
    language,
    level,
    durationUnit,
    durationValue,
    knowledgeGained,
    outcome,
  } = req.body;

  try {
    const newCourse = await Course.create({
      boardId,
      classId,
      subjectId,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileName: req.file.filename,
      courseCategoryId,
      versionId,
      name,
      status: "Active",
      modeOfDelivery,
      accessibility,
      language,
      level,
      durationUnit,
      durationValue,
      knowledgeGained,
      outcome,
      createdBy: req.user._id,
    });
    await newCourse.save();
    res.status(201).json({
      status: "success",
      message: " Course created successfully",
      newCourse,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchCourse = async (req, res, next) => {
  try {
    const courses = await Course.find(req.query)
      .populate("classId")
      .populate("subjectId")
      .populate("versionId")
      .populate("courseCategoryId");
    res.status(200).json({
      status: "success",
      message: " Courses fetched successfully",
      courses,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchCourseBySubjectId = async (req, res, next) => {
  try {
    const courses = await Course.find({
      subjectId: new mongoose.Types.ObjectId(req.params.subjectId),
    });
    res.status(200).json({
      status: "success",
      message: " Courses fetched successfully",
      courses,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchCourseByCategoryId = async (req, res, next) => {
  try {
    const courses = await Course.find({
      courseCategoryId: new mongoose.Types.ObjectId(req.params.categoryId),
    });
    res.status(200).json({
      status: "success",
      message: " Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const fetchCourseById = async (req, res, next) => {
  try {
    const courses = await Course.find({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    res.status(200).json({
      status: "success",
      message: " Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const updateCourse = async (req, res, next) => {
  const {
    boardId,
    classId,
    subjectId,
    courseCategoryId,
    versionId,
    name,
    modeOfDelivery,
    accessibility,
    language,
    level,
    durationUnit,
    durationValue,
    knowledgeGained,
    outcome,
  } = req.body;

  const id = req.params.id;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        boardId,
        classId,
        subjectId,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileName: req.file.filename,
        courseCategoryId,
        versionId,
        name,
        modeOfDelivery,
        accessibility,
        language,
        level,
        durationUnit,
        durationValue,
        knowledgeGained,
        outcome,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Course updated successfully",
      updatedCourse,
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
    const class1 = await Course.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Subject updated successfully",
      class1,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
