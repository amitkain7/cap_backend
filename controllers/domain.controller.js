import Domain from "../models/domain.model.js";

export const createDomain = async (req, res, next) => {
  const { name, colorCode } = req.body;

  try {
    const newDomain = await Domain.create({
      name,
      status: "Active",
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileName: req.file.filename,
      colorCode,
      createdBy: req.user._id,
    });
    await newDomain.save();
    res.status(201).json({
      status: "success",
      message: " Domain created successfully",
      newDomain,
    });
  } catch (error) {
    // next(error);
    let errMsg;
    if (error.code == 11000) {
      // errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      errMsg = "Domain Name Already Exists";
    } else {
      errMsg = error.message;
    }
    res.status(400).json({ statusText: "Bad Request", message: errMsg });
  }
};
export const fetchDomain = async (req, res, next) => {
  try {
    const domains = await Domain.find();
    res.status(200).json({
      status: "success",
      message: " Domains fetched successfully",
      domains,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchDomainById = async (req, res, next) => {
  try {
    const { domainId } = req.params;
    const domain = await Domain.findById(domainId);
    if (!domain)
      throw new Error("domain not found", { cause: { status: 404 } });
    res.status(200).json({
      status: "success",
      message: " domain fetched",
      domain,
    });
  } catch (error) {
    next(error);
  }
};
export const updateDomain = async (req, res, next) => {
  const { name, status, colorCode } = req.body;

  const id = req.params.id;
  try {
    const updatedDomain = await Domain.findByIdAndUpdate(
      id,
      {
        name,
        status,
        originalName: req.file?.originalname,
        filePath: req.file?.path,
        fileName: req.file?.filename,
        colorCode,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Domain updated successfully",
      updatedDomain,
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
    const domain = await Domain.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Domain updated successfully",
      domain,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteDomain = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Domain.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Domain deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
