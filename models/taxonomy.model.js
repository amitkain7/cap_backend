import mongoose from "mongoose";
const taxonomySchema = new mongoose.Schema({
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
    unique: true,
    trim: true,
  },
  colorCode: {
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
const Taxonomy = mongoose.model("Taxonomy", taxonomySchema);
export default Taxonomy;
