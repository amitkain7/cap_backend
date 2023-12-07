import mongoose from "mongoose";
const adminSchoolSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  branchRoleId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranchRole"
    }
  ],
  name: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, { timestamps: true });

const AdminSchool = mongoose.model("AdminSchool", adminSchoolSchema);
export default AdminSchool;
