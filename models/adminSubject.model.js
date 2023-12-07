import mongoose from "mongoose";

const AdminSubjectSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subjectid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    add: Boolean,
    edit: Boolean,
    delete: Boolean,
    view: Boolean,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const AdminSubject = mongoose.model("AdminSubject", AdminSubjectSchema);
export default AdminSubject;
