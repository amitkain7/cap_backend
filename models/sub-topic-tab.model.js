import mongoose from "mongoose";

const subTopicSchema = new mongoose.Schema(
  {
    subTopicId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubTopic",
    },
    name: {
      type: String,
      default: "New Tab",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SubTopicTab = mongoose.model("SubTopicTab", subTopicSchema);
export default SubTopicTab;
