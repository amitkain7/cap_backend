import mongoose from "mongoose";
const instituteSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    trim: true,
  },
  instituteCode: {
    type: String,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entity",
  },
  status: {
    type: String,
    enum: ["InActive", "Active"],
    default: "InActive",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  instituteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institutetype",
  },
  logo: {
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

instituteSchema.statics.getInstitutes = async function (userId, query) {
  try {
    // aggregation pipeline
    const institutes = await this.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
          ...query,
        },
      },
      {
        $lookup: {
          from: "entities",
          localField: "entityId",
          foreignField: "_id",
          as: "entity",
        },
      },
      {
        $lookup: {
          from: "institutetypes",
          localField: "instituteType",
          foreignField: "_id",
          as: "instituteType",
        },
      },
      {
        $unwind: "$entity",
      },
      {
        $unwind: "$instituteType",
      },
      {
        $lookup: {
          from: "branches",
          localField: "_id", // Assuming "_id" is the instituteId in your collection
          foreignField: "instituteId",
          as: "branches",
        },
      },
      
      {
        $addFields: {
          branchCount: { $size: "$branches" },
          teacherLicenseCount: { $sum: "$branches.teacherLicenseCount" },
          studentLicenseCount: { $sum: "$branches.studentLicenseCount" },
        },
      },
      {
        $project: {
          entityId: 0, // Exclude entityId from the result
          branches: 0, // Exclude branches from the final result if needed
        },
      },
    ]);

    return institutes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const Institute = mongoose.model("Institute", instituteSchema);
export default Institute;
