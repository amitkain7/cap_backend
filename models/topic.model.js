import mongoose from "mongoose";
const topicSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  topicName: {
    type: String,
  },
  learningObjective: {
    type: String,
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
  }],
  methodologies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Methodology",
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
