import mongoose from "mongoose";
const branchSchema = new mongoose.Schema({
  name: String,
  logo: String,
  category: {
    type: String,
    enum: ["registeredOffice", "corporateOffice", "school", "regionalOffice"],
    required: [true, "must provide branch category"],
  },
  type: {
    type: String,
    enum: ["ownBranch", "franchise", "partnership"],
    required: [true, "must provide branch type"],
  },
  address: {
    location: String,
    street1: String,
    street2: String,
    pinCode: Number,
    city: String,
    state: String,
  },
  status: {
    type: String,
    enum: ["InActive", "Active"],
    default: "Active",
  },
  isPrimary: Boolean,
  isCapricsOffer: Boolean,
  fullName: String,
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institute",
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  teacherLicenseCount: {
    type: Number
  },
  studentLicenseCount: {
    type: Number
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

// Define the getBranches static method
branchSchema.statics.getBranches = async function (userId, query = {}) {
  try {
    // aggregation pipeline
    const branches = await this.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
          ...query
        },
      },
      {
        $lookup: {
          from: "institutes",
          localField: "instituteId",
          foreignField: "_id",
          as: "institute",
        },
      },
      {
        $unwind: "$institute",
      },
      {
        $project: {
          instituteId: 0, // Exclude instituteId from the result
        }
      }
    ]);

    return branches;
  } catch (error) {
    // Handle errors here
    console.error(error);
    throw error;
  }
};


const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
