import mongoose from "mongoose";
const courseAccessSchema = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 
});
const CourseAccess = mongoose.model("CourseAccess", courseAccessSchema);
export default CourseAccess;
