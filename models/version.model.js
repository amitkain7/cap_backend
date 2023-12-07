import mongoose from "mongoose";
const versionSchema = new mongoose.Schema({
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
const Version = mongoose.model("Version", versionSchema);
export default Version;
