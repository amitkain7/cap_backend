import AdminCourse from "../models/adminCourse.model.js";

export async function addAdminCourse(req, res, next) {
  try {
    const data = await AdminCourse.create({
      ...req.body,
      addedBy: req.user._id,
      updatedBy: req.user._id,
    });
    return res.status(201).json({
      status: "success",
      message: "Admin course created successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAdminCourse(req, res, next) {
  try {
    const { adminCourseId } = req.params;
    const data = await AdminCourse.findByIdAndUpdate(adminCourseId, {
      ...req.body,
      updatedBy: req.user._id,
    });
    return res.status(201).json({
      status: "success",
      message: "Admin course created successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchAllAdminCourse(req, res, next) {
  try {
    const data = await AdminCourse.find({}).populate("courseid");
    return res.status(200).json({
      status: "success",
      message: "Admin Course Fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchAdminCourseByUserId(req, res, next) {
  try {
    const data = await AdminCourse.find({
      userid: req.params.userId,
    }).populate("courseid");
    return res.status(200).json({
      status: "success",
      message: "Admin Course Fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function bulkUpdateAdminCourse(req, res, next) {
  try {
    const { ids, ...rest } = req.body;
    await AdminCourse.updateMany({ _id: { $in: ids } }, { ...rest });
    return res.status(200).json({
      status: "success",
      message: "Admin Course Updated successfully",
    });
  } catch (error) {
    next(error);
  }
}
