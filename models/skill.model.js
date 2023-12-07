import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
