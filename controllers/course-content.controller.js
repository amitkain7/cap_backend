import CourseContent from "../models/course-content.model.js";

import { deepLog } from "../utils/deep-log.js";
export const addCourseContent = async (req, res, next) => {
  try {
    let {
      subTopicId,
      tabId,
      type,
      content,
      contentId,
      priorityOrder = 1,
      caption,
      taxonomyId,
    } = req.body;
    const filename = req?.file?.filename;
    let newCourseContent;
    if (type === "image") {
      newCourseContent = await CourseContent.create({
        subTopicId,
        tabId,
        priorityOrder,
        type,
        ...(contentId && { contentId }),
        createdBy: req.user._id,
        content: {
          ...(filename && { image: filename }),
          ...(caption && { caption }),
          ...(taxonomyId && { taxonomyId }),
        },
      });
    } else if (["audio", "video", "file", "document"].includes(type)) {
      newCourseContent = await CourseContent.create({
        subTopicId,
        tabId,
        priorityOrder,
        type,
        ...(contentId && { contentId }),
        createdBy: req.user._id,
        content: {
          file: filename,
          ...(caption && { caption }),
          ...(taxonomyId && { taxonomyId }),
        },
      });
    } else if (type === "table") {
      newCourseContent = await CourseContent.create({
        subTopicId,
        tabId,
        priorityOrder,
        type,
        createdBy: req.user._id,
        content: {
          ...(taxonomyId && { taxonomyId }),
          table: content,
        },
      });
    } else {
      newCourseContent = await CourseContent.create({
        subTopicId,
        tabId,
        type,
        ...(content ? { content } : { content: {} }),
        priorityOrder,
        createdBy: req.user._id,
      });
    }

    res.status(201).json({
      status: "success",
      message: "course content added",
      newCourseContent,
    });
  } catch (err) {
    next(err);
  }
};

export const fetchCourseContent = async (req, res, next) => {
  try {
    const contents = await CourseContent.find({
      // subTopicId: req.params.subTopicId,
      tabId: req.params.tabId,
    }).sort({ priorityOrder: "asc" });
    return res.status(200).json({
      status: "success",
      message: "course content fetched",
      contents,
    });
  } catch (err) {
    next(err);
  }
};

export const changePriority = async (req, res, next) => {
  try {
    const { coursePriority } = req.body;
    const updatedContents = await Promise.all(
      coursePriority?.map(async (data) => {
        const content = await CourseContent?.findByIdAndUpdate(
          data._id,
          { priorityOrder: data.priorityOrder },
          { new: true }
        );
        return content;
      })
    );

    res.status(200).json({
      status: "success",
      message: "priority changed",
      updatedContents,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const deletedContent = await CourseContent.findByIdAndDelete(contentId);
    if (!deletedContent)
      throw new Error("Content not found", { cause: { status: 404 } });
    res.status(200).json({
      status: "success",
      message: "content deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const fetchContentById = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    const content = await CourseContent.findById(contentId);
    res.status(200).json({
      status: "success",
      message: "content fetched",
      content,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCourseContent = async (req, res, next) => {
  try {
    let { courseContentId, type, content, contentId, taxonomyId, caption } =
      req.body;
    console.log(req.body);
    const filename = req?.file?.filename;
    const courseContent = await CourseContent.findById(courseContentId);
    if (type === "image") {
      let imageContent = {
        ...courseContent.content,
        ...(caption && { caption }),
        ...(taxonomyId && { taxonomyId }),
      };
      if (filename) {
        imageContent.image = filename;
        courseContent.contentId = null;
      } else if (contentId) {
        imageContent.image = null;
        courseContent.contentId = contentId;
      }
      courseContent.content = imageContent;
    } else if (["audio", "video", "file", "document"].includes(type)) {
      let fileContent = {
        ...courseContent.content,
        ...(caption && { caption }),
        ...(taxonomyId && { taxonomyId }),
      };
      if (filename) {
        fileContent.file = filename;
        courseContent.contentId = null;
      } else if (contentId) {
        fileContent.file = null;
        courseContent.contentId = contentId;
      }
      console.log({ fileContent });
      courseContent.content = fileContent;
    } else if (type === "table") {
      let tableContent = {
        ...courseContent.content,
        ...(taxonomyId && { taxonomyId }),
        ...(content && { table: content }),
      };
      courseContent.content = tableContent;
    } else if (content && !isEmptyObject(content)) {
      courseContent.content = { ...courseContent.content, ...content };
    }
    await courseContent.save();

    console.log({ courseContent });
    res.status(201).json({
      status: "success",
      message: "course content updated",
      courseContent,
    });
  } catch (err) {
    next(err);
  }
};

function isEmptyObject(obj) {
  if (!obj) return false;
  return !Object?.keys?.(obj)?.length;
}
