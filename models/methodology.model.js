import mongoose from "mongoose";
const methodologySchema = new mongoose.Schema({
  originalName: {
    type: String,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Methodology = mongoose.model("Methodology", methodologySchema);
export default Methodology;
