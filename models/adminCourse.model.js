import mongoose from "mongoose";

const AdminCourseSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    courseid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    add: Boolean,
    edit: Boolean,
    delete: Boolean,
    view: Boolean,
    addedBy: {
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

const AdminCourse = mongoose.model("AdminCourse", AdminCourseSchema);
export default AdminCourse;
