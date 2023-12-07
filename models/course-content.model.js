import mongoose from "mongoose";
import { courseContentType } from "../utils/custom-types.js";

const courseContentSchema = new mongoose.Schema(
  {
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTopic",
      required: [true, "subTopicId required on course content"],
    },
    tabId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTopicTab",
      required: [true, "subTopicTabId required on course content"],
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content",
    },
    type: {
      type: String,
      enum: courseContentType.enum,
      required: [true, "type required on course content"],
    },
    content: {
      type: {},
      required: [true, "content required on course content"],
    },
    priorityOrder: {
      type: Number,
      required: [true, "priorityOrder required on course content"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy required on course content"],
    },
  },
  { timestamps: true }
);

const CourseContent = mongoose.model("CourseContent", courseContentSchema);
export default CourseContent;
