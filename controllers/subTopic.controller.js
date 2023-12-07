import CourseContent from "../models/course-content.model.js";
import SubTopic from "../models/subtopic.model.js";
import SubTopicTab from "../models/sub-topic-tab.model.js";

export const createSubTopic = async (req, res, next) => {
  const { name, description, topicId } = req.body;

  try {
    const newSubTopic = await SubTopic.create({
      name,
      topicId,
      ...(description && { description }),
      createdBy: req.user._id,
    });
    const newTab = await SubTopicTab.create({
      subTopicId: newSubTopic._id,
      name: "New Tab",
      createdBy: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: " SubTopic created successfully",
      newSubTopic,
      newTab,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchSubTopic = async (req, res, next) => {
  try {
    const SubTopics = await SubTopic.find({ topicId: req.params.topicId });
    res.status(200).json({
      status: "success",
      message: " SubTopics fetched successfully",
      SubTopics,
    });
  } catch (error) {
    next(error);
  }
};
export const updateSubTopic = async (req, res, next) => {
  const { name, topicId, description } = req.body;

  const id = req.params.id;
  try {
    const updatedSubTopic = await SubTopic.findByIdAndUpdate(
      id,
      {
        name,
        topicId,
        ...(description && { description }),
        updatedAt: Date.now(),
        updatedBy: req.user._id,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " SubTopic updated successfully",
      updatedSubTopic,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteSubTopic = async (req, res, next) => {
  const id = req.params.id;
  try {
    await SubTopic.findByIdAndDelete(id);
    await CourseContent.deleteMany({ subTopicId: id });
    res.status(201).json({
      status: "success",
      message: "SubTopic deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchSubTopicById = async (req, res, next) => {
  try {
    const { subTopicId } = req.params;
    const subTopic = await SubTopic.findById(subTopicId);
    if (!subTopic) throw new Error("SubTopic not found");
    res.status(200).json({
      status: "success",
      message: "SubTopic fetched successfully",
      subTopic,
    });
  } catch (err) {
    next(err);
  }
};
