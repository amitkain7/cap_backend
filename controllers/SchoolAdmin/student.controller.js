import mongoose from "mongoose";
import User from "../../models/user.model";
import Student from "../../models/SchoolAdmin/student.model";
import bcrypt from "bcrypt";

export const createStudent = async (req, res, next) => {
    const { fName, lName, email, phoneNumber, password } = req.body

    try {
        let userExists = await User.findOne({ email: emailAddress });
        userExists = userExists || (await User.findOne({ mobileNumber: phoneNumber }));

        if (userExists) {
            throw new Error("user already exists with that phone or email", {
              cause: { status: 400 },
            });
          }

          const passwordHash = await bcrypt.hash(password, 10);
    }
}