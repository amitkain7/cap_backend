import CourseContent from "../models/course-content.model.js";
import SubTopic from "../models/subtopic.model.js";
import Topic from "../models/topic.model.js";
export const createTopic = async (req, res, next) => {
  const { learningObjective, skills, methodologies, topicName, courseId } =
    req.body;

  try {
    const newTopic = await Topic.create({
      learningObjective,
      skills,
      methodologies,
      topicName,
      courseId,
      createdBy: req.user._id,
    });
    await newTopic.save();
    res.status(201).json({
      status: "success",
      message: " Topic created successfully",
      newTopic,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchTopic = async (req, res, next) => {
  try {
    const topics = await Topic.find({ courseId: req.params.courseId });
    res.status(200).json({
      status: "success",
      message: " topics fetched successfully",
      topics,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTopic = async (req, res, next) => {
  const { learningObjective, skills, methodologies, topicName, courseId } =
    req.body;
  const id = req.params.id;
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      {
        learningObjective,
        skills,
        methodologies,
        topicName,
        courseId,
        updatedAt: Date.now(),
        updatedBy: req.user._id,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: " Topic updated successfully",
      updatedTopic,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTopic = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Topic.findByIdAndDelete(id);
    const deletedSubTopics = await SubTopic.find({ topicId: id });
    await SubTopic.deleteMany({ topicId: id });
    const deletedSubTopicIds = deletedSubTopics?.map(
      (subTopic) => subTopic?._id
    );
    await CourseContent.deleteMany({
      subTopicId: { $in: deletedSubTopicIds },
    });

    res.status(201).json({
      status: "success",
      message: "Topic deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchTopicById = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        status: "error",
        message: "Topic not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Topic fetched successfully",
      topic,
    });
  } catch (err) {
    next(err);
  }
};
