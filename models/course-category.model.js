import mongoose from "mongoose";
const courseCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["InActive", "Active"],
      default: "Active",
    },
    topicAliasSingular: {
      type: String,
      trim: true,
    },
    topicAliasPlural: {
      type: String,
      trim: true,
    },
    subTopicAliasSingular: {
      type: String,
      trim: true,
    },
    subTopicAliasPlural: {
      type: String,
      trim: true,
    },
    courseAliasSingular: {
      type: String,
      trim: true,
    },
    courseAliasPlural: {
      type: String,
      trim: true,
    },
    colorCode: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);
export default CourseCategory;
