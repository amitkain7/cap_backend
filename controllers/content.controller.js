import Content from "../models/content.model.js";
import User from "../models/user.model.js";

export const createContent = async (req, res, next) => {
  try {
    const {
      boardId,
      classId,
      subjectId,
      versionId,
      title,
      description,
      accessibility,
      contentType,
      contentUrl,
      documentType,
      videoType,
      tags,
      visibility,
    } = req.body;
    const user = await User.findById(req.user._id);
    const thumbnail = {
      originalName: req.files.thumbnail[0].originalname,

      fileName: req.files.thumbnail[0].filename,

      filePath: req.files.thumbnail[0].path,
    };
    console.log(req.files);
    let document = {};
    if (req.files.document) {
      document = {
        originalName: req.files.document[0].originalname,

        fileName: req.files.document[0].filename,

        filePath: req.files.document[0].path,
      };
    }
    const contentUri = contentUrl ? contentUrl : "";

    const newContent = await Content.create({
      boardId,
      classId,
      subjectId,
      versionId,
      title,
      description,
      document,
      thumbnail,
      accessibility,
      contentType,
      contentUrl: contentUri,
      documentType,
      ...(videoType&&{videoType}),
      tags,
      visibility,
      createdByName: `${user.fName} ${user.lName}`,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: " Content created successfully",
      newContent,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchContent = async (req, res, next) => {
  try {
    const Contents = await Content.find({});
    res.status(200).json({
      status: "success",
      message: " Contents fetched successfully",
      Contents,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      boardId,
      classId,
      subjectId,
      versionId,
      title,
      description,
      accessibility,
      contentType,
      contentUrl,
      documentType,
      videoType,
      tags,
      visibility,
    } = req.body;

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        boardId,
        classId,
        subjectId,
        versionId,
        title,
        description,
        accessibility,
        originalName: req.file?.originalname,
        filePath: req.file?.path,
        fileName: req.file?.filename,
        contentUrl,
        contentType,
        ...(documentType && { documentType }),
        ...(videoType && { videoType }),
        tags,
        visibility,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Content updated successfully",
      updatedContent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Content.findByIdAndDelete(id);
    res.status(201).json({
      status: "success",
      message: "Content deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchContentByType = async (req, res, next) => {
  try {
    const { contentType } = req.params;
    const { subjectId, boardId, classId } = req.query;

    const isDoc = contentType === "Document";
    const isDocChild = ["Pdf", "Ppt", "Word", "Excel"].includes(contentType);
    const isImage = contentType === "Image";

    const query = {};
    if (isDoc) {
      query.documentType = { $in: ["Pdf", "Ppt", "Word", "Excel"] };
    } else if (isDocChild) {
      query.documentType = contentType;
    } else if (isImage) {
      query.documentType = "Image";
    } else {
      query.contentType = contentType;
    }

    const Contents = await Content.find(
      {
        ...query,
        ...(subjectId && { subjectId }),
        ...(boardId && { boardId }),
        ...(classId && { classId }),
      }
      // {
      // ...(isDocChild ? { documentType: contentType } : { contentType }),
      // }
    );
    res.status(200).json({
      status: "success",
      message: " Contents fetched successfully",
      Contents,
    });
  } catch (err) {
    next(err);
  }
};

export const fetchContentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);
    res.status(200).json({
      status: "success",
      message: " Content fetched successfully",
      content,
    });
  } catch (err) {
    next(err);
  }
};
