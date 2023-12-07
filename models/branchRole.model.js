import mongoose from "mongoose";
const branchRoleSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  },
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

const BranchRole = mongoose.model("BranchRole", branchRoleSchema);
export default BranchRole;
