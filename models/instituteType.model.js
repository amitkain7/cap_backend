import mongoose from "mongoose";
const instituteTypeSchema = new mongoose.Schema({
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
const Institutetype = mongoose.model("Institutetype", instituteTypeSchema);
export default Institutetype;
