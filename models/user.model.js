import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    roleid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    hash: {
      type: String,
      required: [true, "can't be blank"],
    },
    status: {
      type: String,
      enum: ["InActive", "Active"],
      default: "InActive",
    },
    profilePic: {
      type: String,
    },
    fName: {
      type: String,
    },
    lName: {
      type: String,
    },
    mobileNumber: {
      type: Number,
      unique: true,
    },
    usertype: {
      type: String,
      enum: ["admin", "client", "employee", "entity", "School Admin", "Staff"],
      default: "admin",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

// userSchema.pre("save", async function(next){
//   // save hash password
//   const hashedPassword = await bcrypt.hash(this.hash, 10);
//   this.hash = hashedPassword;
//   next()
// })

const User = mongoose.model("User", userSchema);
export default User;
