import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  status: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  createdByName: {
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
const Class = mongoose.model("Class", classSchema);
export default Class;
