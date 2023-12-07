import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      editCourse: Boolean,
      editSchool: Boolean,
      changePassword: Boolean,
    },
    role: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    instituteType: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    version: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    boards: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    classes: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    subject: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    skill: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    domain: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    taxonomy: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    courseCategory: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    academicYear: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    methodology: {
      add: Boolean,
      edit: Boolean,
      view: Boolean,
      delete: Boolean,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);
export default Role;
