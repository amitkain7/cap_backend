import mongoose from "mongoose";
const domainSchema = new mongoose.Schema({
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
const Domain = mongoose.model("Domain", domainSchema);
export default Domain;
