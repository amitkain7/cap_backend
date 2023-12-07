import mongoose from "mongoose";

const BundleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    courseCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCategory",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    accessibility: {
      type: String,
      enum: ["School", "Student", "Teacher"],
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    modules: [],
    status: {
      type: String,
      enum: ["InActive", "Active"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Bundle = mongoose.model("Bundle", BundleSchema);
export default Bundle;
