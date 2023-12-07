import Taxonomy from "../models/taxonomy.model.js";

export const createTaxonomy = async (req, res, next) => {
  try {
    const { name, colorCode } = req.body;

    const file = req?.file;
    if (!file)
      throw new Error("taxonomy image required", { cause: { status: 400 } });

    const newTaxonomy = await Taxonomy.create({
      name,
      status: "Active",
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileName: req.file.filename,
      colorCode,
      createdBy: req.user._id,
    });
    await newTaxonomy.save();
    res.status(201).json({
      status: "success",
      message: " Taxonomy created successfully",
      newTaxonomy,
    });
  } catch (error) {
    // next(error);
    let errMsg;
    if (error.code == 11000) {
      // errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      errMsg = "Taxonomy Name Already Exists";
    } else {
      errMsg = error.message;
    }
    res.status(400).json({ statusText: "Bad Request", message: errMsg });
  }
};
export const fetchTaxonomy = async (req, res, next) => {
  try {
    const taxonomies = await Taxonomy.find();
    res.status(200).json({
      status: "success",
      message: " Taxonomies fetched successfully",
      taxonomies,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchTaxonomyById = async (req, res, next) => {
  try {
    const { taxonomyId } = req.params;
    const taxonomy = await Taxonomy.findById(taxonomyId);
    res.status(200).json({
      status: "success",
      message: " Taxonomy fetched successfully",
      taxonomy,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTaxonomy = async (req, res, next) => {
  const { name, status, colorCode } = req.body;

  const id = req.params.id;
  try {
    const updatedTaxonomy = await Taxonomy.findByIdAndUpdate(
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
      message: " Taxonomy updated successfully",
      updatedTaxonomy,
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
    const taxonomy = await Taxonomy.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Taxonomy updated successfully",
      taxonomy,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTaxonomy = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Taxonomy.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Taxonomy deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
