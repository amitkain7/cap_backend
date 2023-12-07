import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: [true],
  },
  password: {
    type: String,
    required: true,
  },
  GFirstName: {
    type: String
  },
  GEmail: {
    type: String
  },
  GPhoneNumber: {
    type: String
  },
  GPassword: {
    type: String
  },
  GRelation: {
    type: String
  }
});
const Student = mongoose.model("Student", studentSchema);
export default Student;
