import Role from "../models/role.model.js";

export async function addRole(req, res, next) {
  try {
    const data = await Role.create({
      ...req.body,
      addedBy: req.user._id,
      updatedBy: req.user._id,
    });
    return res.status(201).json({
      status: "success",
      message: "Role created successfully!",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  try {
    const { roleId } = req.params;
    const data = await Role.findByIdAndUpdate(
      roleId,
      { ...req.body, updatedBy: req.user._id },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "Role updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchAllRole(req, res, next) {
  try {
    const data = await Role.find({});
    return res.status(200).json({
      status: "success",
      message: "Role Fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}
