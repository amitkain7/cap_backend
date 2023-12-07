import AdminSubject from "../models/adminSubject.model.js";

export async function addAdminSubject(req, res, next) {
  try {
    const data = await AdminSubject.create({
      ...req.body,
      addedBy: req.user._id,
      updatedBy: req.user._id,
    });
    return res.status(201).json({
      status: "success",
      message: "Admin subject created successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAdminSubject(req, res, next) {
  try {
    const { adminSubjectId } = req.params;
    const data = await AdminSubject.findByIdAndUpdate(adminSubjectId, {
      ...req.body,
      updatedBy: req.user._id,
    });
    return res.status(200).json({
      status: "success",
      message: "Admin subject updated successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchAllAdminSubject(req, res, next) {
  try {
    const data = await AdminSubject.find({}).populate("subjectid");
    return res.status(200).json({
      status: "success",
      message: "Admin Subject Fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchAdminSubjectByUserId(req, res, next) {
  try {
    const data = await AdminSubject.find({
      userid: req.params.userId,
    }).populate("subjectid");
    return res.status(200).json({
      status: "success",
      message: "Admin Subject Fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function bulkUpdateAdminSubject(req, res, next) {
  try {
    const { ids, ...rest } = req.body;
    await AdminSubject.updateMany({ _id: { $in: ids } }, { ...rest });
    return res.status(200).json({
      status: "success",
      message: "Admin Subject Updated successfully",
    });
  } catch (error) {
    next(error);
  }
}
