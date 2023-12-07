import mongoose from "mongoose";
const contentSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  versionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Version",
  },
  title: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
  },

  contentUrl: {
    type: String,
  },
  thumbnail: {
    originalName: String,

    fileName: String,

    filePath: String,
  },
  document: {
    originalName: String,

    fileName: String,

    filePath: String,
  },
  accessibility: {
    type: String,
    enum: ["Learners", "Instructors"],
  },
  contentType: {
    type: String,
    enum: ["Audio", "Video", "Document", "H5P"],
  },
  documentType: {
    type: String,
    enum: ["Pdf", "Ppt", "Image", "Word", "Excel"],
  },
  videoType: {
    type: String,
    enum: ["Vimeo", "Youtube"],
  },
  tags: [
    {
      type: String,
    },
  ],
  visibility: {
    type: String,
    enum: ["Public", "Private"],
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
const Content = mongoose.model("Content", contentSchema);
export default Content;
