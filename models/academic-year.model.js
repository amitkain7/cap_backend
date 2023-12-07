import mongoose from "mongoose";

const academicYearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["InActive", "Active"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const AcademicYear = mongoose.model("AcademicYear", academicYearSchema);
export default AcademicYear;
