import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  name: {
    type: String,
    trim: true,
  },
  subjectCode: {
    type: String,
  },
  colorCode: {
    type: String,
  },
  status: {
    type: String,
  },
  courseCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseCategory",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdByName: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
