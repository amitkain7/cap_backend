import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  courseCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseCategory",
  },
  versionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Version",
  },
  name: {
    type: String,
  },
  originalName: {
    type: String,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  status: {
    type: String,
  },
  modeOfDelivery: {
    type: String,
    enum: ["Online", "Offline"],
  },
  accessibility: {
    type: String,
    enum: ["School", "Teacher", "Student"],
  },
  language: {
    type: String,
  },
  level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  durationUnit: {
    type: String,
    enum: ["Minutes", "Hours", "Days", "Periods"],
  },
  durationValue: {
    type: Number,
  },

  knowledgeGained: [
    {
      name: String,
      points: Number,
    },
  ],
  outcome: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
