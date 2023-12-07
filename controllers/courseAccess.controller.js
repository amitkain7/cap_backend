import CourseAccess from "../models/course-access.model.js";
export const createCourseAccess = async (req, res, next) => {
  const {userId,boardId,classId,subjectId } = req.body;

  try {
    const newCourseAccess = await CourseAccess.create({
        userId,boardId,classId,subjectId,
      createdBy: req.user._id,
    });
    await newCourseAccess.save();
    res.status(201).json({
      status: "success",
      message: " Course Access created successfully",
      newCourseAccess,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchCourseAccess = async (req, res, next) => {
  try {
    const CourseAccesses = await CourseAccess.find({userId: req.params.userId});
    res.status(200).json({
      status: "success",
      message: " CourseAccess fetched successfully",
      CourseAccesses,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseAccess = async (req, res, next) => {
    const id = req.params.id;
    try {
      await CourseAccess.findByIdAndDelete(id);
      res.status(201).json({
        status: "success",
        message: "CourseAccess deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
