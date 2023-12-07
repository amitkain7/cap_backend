import mongoose from "mongoose";
import CourseOverview from "../models/courseOverview.model.js";

export const createCourseOverview = async (req, res, next) => {
  try {
    const { periods, order, overview, boards : boardId, classes: classId, subjects: subjectId, versions: versionId } = req.body;

    const courseOverview = await CourseOverview.create({
      periodsCount: periods,
      positionIndex: order,
      overview,
      createdBy: req.user._id,
      boardId,
      classId,
      subjectId,
      versionId
    });

    res.status(201).json({
      status: "success",
      message: " Course created successfully",
      courseOverview,
    });
  } catch (error) {
    next(error);
  }
};


export const fetchCourseOverview = async (req, res, next) => {
  try {
    const courseOverview = await CourseOverview
                            .find({ createdBy : new mongoose.Types.ObjectId(req.user._id)})
                            .populate("overview.courses overview.topics overview.subTopics")

    res.status(200).json({
      status: "success",
      message: " Course fetch successfully",
      courseOverview,
    });
  } catch (error) {
    next(error)
  }
}

export const fetchFilterCourseOverview = async (req, res, next) => {
  try {
    const query = req.query

    for(let key in query){
      if(mongoose.isValidObjectId(query[key]))
        query[key] = new mongoose.Types.ObjectId(query[key])
    }

    const courseOverview = await CourseOverview.find({ createdBy : new mongoose.Types.ObjectId(req.user._id), ...query })
                            .populate("overview.courses")


    res.status(200).json({
      status: "success",
      message: " Course filter successfully",
      courseOverview,
    })
    
  } catch (error) {
    next(error)
  }
}

export const deleteCourseOverview = async (req, res, next) => {
  try {
    const id = req.params.id

    const deleted = await CourseOverview.deleteOne({ _id: new mongoose.Types.ObjectId(id) })

    res.status(200).json({
      status: "success",
      message: " Course deleted successfully",
      deleted
    })
  } catch (error) {
    next(error)
  }
}

export const updateCourseOverview = async (req, res, next) => {
  try {
    const id = req.params.id
    const { periods, order, overview, boards : boardId, classes: classId, subjects: subjectId, versions: versionId } = req.body;
    
    const updatedCourse = await CourseOverview.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, {
      periodsCount: periods,
      positionIndex: order,
      overview,
      boardId,
      classId,
      subjectId,
      versionId
    }, {
      new: true
    })
    .populate("overview.courses overview.topics overview.subTopics")

    res.status(200).json({
      status: "success",
      message: " Course updated successfully",
      updatedCourse,
    })
  } catch (error) {
    next(error)
  }
}