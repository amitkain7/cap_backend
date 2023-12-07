import AcademicYear from "../models/academic-year.model.js";

export const createAcademicYear = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAcademicYear = await AcademicYear.create({
      name,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " AcademicYear created successfully",
      newAcademicYear,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchAcademicYear = async (req, res, next) => {
  try {
    const academicYears = await AcademicYear.find({});
    res.status(200).json({
      status: "success",
      message: " Academic Year fetched successfully",
      academicYears,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAcademicYear = async (req, res, next) => {
  const { name } = req.body;

  const id = req.params.id;
  try {
    const updatedAcademicYear = await AcademicYear.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " AcademicYear updated successfully",
      updatedAcademicYear,
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
    const updatedAcademicYear = await AcademicYear.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " AcademicYear updated successfully",
      updatedAcademicYear,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAcademicYear = async (req, res, next) => {
  const id = req.params.id;
  try {
    await AcademicYear.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "AcademicYear deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
