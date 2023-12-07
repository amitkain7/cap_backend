import mongoose from "mongoose";
const courseOverviewSchema = new mongoose.Schema({
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
    ref: "Subject",
  },
  // courseCategoryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "CourseCategory",
  // },
  versionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Version",
  },
  
  positionIndex: {
    type: Number
  },

  periodsCount: {
    type: Number
  },

  overview: [
    {
      categoryId: mongoose.Schema.Types.ObjectId,
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
      topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic"}],
      subTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubTopic"}],
      // ref: 'CourseCategory'
    }
  ],

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
const CourseOverview = mongoose.model("CourseOverview", courseOverviewSchema);
export default CourseOverview;
