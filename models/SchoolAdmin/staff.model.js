import mongoose from "mongoose";
const staffSchema = new mongoose.Schema({
  staffNo: {
    type: String,
    required: [true],
  },
  fName: {
    type: String,
    required: [true],
  },
  lName: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true],
  },
  doj: {
    type: Date,
  },
  branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
  department: {
    type: String,
  },
  businessTitle: {
    type: String,
  },
  designation: {
    type: String,
    required: [true],
  },
  employmentType: {
    type: String,
    enum: ["fullTime", "partTime", "contract"],
    default: "fullTime",
  },
  contractStartDate: {
    type: Date,
  },
  contractLastDate: {
    type: Date,
  },
  employmentGrade: {
    type: String,
    enum: ["level1", "level2", "level3"],
    default: "level1",
  },
  probationPeriod: {
    type: Number,
  },
  probationPeriodUnit: {
    type: String,
    enum: ["days", "months", "years"],
    default: "days",
  },
  manager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "",
    },
  ],
  employeeStatus: {
    type: String,
    enum: ["active", "LOP", "resigned", "terminated"],
    default: "active",
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  photograph: {
    type: String,
  },
  maritalStatus: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
    default: "single",
  },
  noOfChildren: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  spouseName: {
    type: String,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    default: "A+",
  },
  nationality: {
    type: String,
  },
  emailAddress: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "enter valid email"],
  },
  phoneNumber: {
    type: Number,
    required: [true],
  },
  homePhone: {
    type: Number,
  },
  addressLine1: {
    type: String,
    required: [true],
  },
  addressLine2: {
    type: String,
    required: [true],
  },
  zipCode: {
    type: Number,
    required: [true],
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  emergencyContactName: {
    type: String,
  },
  emergencyContactNumber: {
    type: Number,
    required: [true],
  },
  qualification: [
    {
      schoolName: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldOfStudy: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      grade: {
        type: String,
      },
      activities: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  previousExperience: [
    {
      title: {
        type: String,
      },
      employmentType: {
        type: String,
        enum: ["fullTime", "partTime", "contract"],
        default: "fullTime",
      },
      companyName: {
        type: String,
      },
      location: {
        type: String,
      },
      startdate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  yearsOfExperience: {
    type: String,
  },
  bankName: {
    type: String,
  },
  beneficiaryName: {
    type: String,
  },
  bankAccountNo: {
    type: Number,
  },
  ifscCode: {
    type: String,
  },
  salaryInformation: {
    type: Number,
  },
  payFrequency: {
    type: String,
    enum: ["monthly", "biWeekly"],
    default: "monthly",
  },
  taxDeduction: {
    type: String,
  },
  deductions: {
    type: String,
    enum: ["forRetirement", "healthInsurance"],
    default: "forRetirement",
  },
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
const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
