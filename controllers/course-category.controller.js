import CourseCategory from "../models/course-category.model.js";

export const createCourseCategory = async (req, res, next) => {
  try {
    const newCourseCategory = await CourseCategory.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " CourseCategory created successfully",
      newCourseCategory,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchCourseCategory = async (req, res, next) => {
  try {
    const courseCategories = await CourseCategory.find();
    res.status(200).json({
      status: "success",
      message: " Course Categories fetched successfully",
      courseCategories,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCourseCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedCourseCategory = await CourseCategory.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " CourseCategory updated successfully",
      updatedCourseCategory,
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
    const updatedCourseCategory = await CourseCategory.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " CourseCategory updated successfully",
      updatedCourseCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    await CourseCategory.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "CourseCategory deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
