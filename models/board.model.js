import mongoose from "mongoose";
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
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
const Board = mongoose.model("Board", boardSchema);
export default Board;
