import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Confirmation from "../models/verify-user-account.model.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
uuidv4();
import { generateJwtToken } from "../utils/generate-token.js";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_MAIL_ID,
    pass: process.env.PASSWORD,
  },
});

export const registerUserWithEmail = async (req, res, next) => {
  const { email, fName, lName, mobileNumber, password } = req.body;
  try {
    let userExists = await User.findOne({ email: email });
    userExists =
      userExists || (await User.findOne({ mobileNumber: mobileNumber }));
    if (userExists) {
      throw new Error("user already exists with that phone or email", {
        cause: { status: 400 },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      fName,
      lName,
      mobileNumber,
      hash: passwordHash,
    });
    await newUser.save();

    const newUuid = await Confirmation.create({
      userId: newUser._id,
      token: uuidv4(),
    });
    await newUuid.save();

    let mailDetails = {
      from: process.env.SENDER_MAIL_ID,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${fName}<p>Thank you for registering. Please confirm your email by clicking on the following link</p> <a href=${process.env.BACKEND_URI}/api/auth/verify/${newUser._id}> Click here to verify your account</a>`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        throw new Error("Mail not Sent , Please try registration again ", {
          cause: { status: 500 },
        });
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({
      status: "success",
      message:
        "Account created successfully with verification Mail sent to your email address",
    });
  } catch (err) {
    next(err);
  }
};
export const updateUserDetails = async (req, res, next) => {
  try {
    const updatedBy = await User.findById(req.user._id);
    const user = await User.findById(req.params.userId);

    if (!updatedBy._id.equals(user._id) && updatedBy.usertype !== "admin" && updatedBy.usertype !== "School Admin") {
      return res.status(400).json({
        error: "invalid User",
      });
    }

    if (req.file) req.body.profilePic = req.file.filename;

    if (req.body.email !== user.email) req.body.status = "InActive";

    const data = await User.findByIdAndUpdate(
      req.params.userId,
      { ...req.body },
      { new: true }
    );

    if (req.body.email !== user.email) {
      let mailDetails = {
        from: process.env.SENDER_MAIL_ID,
        to: req.body.email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${user.fName}<p>Thank you for registering. Please confirm your email by clicking on the following link</p> <a href=${process.env.BACKEND_URI}/api/auth/verify/${user._id}> Click here to verify your account</a>`,
      };
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
          throw new Error("Mail not Sent , Please try again ", {
            cause: { status: 500 },
          });
        } else {
          console.log("Email sent successfully");
        }
      });
    }

    res.status(200).json({
      status: "success",
      message: "User Updated Successfully",
      user: data,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
export const verifyUser = async (req, res, next) => {
  try {
    const confirmation = await Confirmation.findOne({
      userId: req.params.userId,
    });
    if (!confirmation) {
      // return res.status(404).send({ message: "Verification link has been expired" });
      return res.redirect(`${process.env.FRONTEND_URI}/confirm/error`);
    }
    const user = await User.findById(confirmation.userId);
    user.status = "Active";
    await user.save();

    res.redirect(`${process.env.FRONTEND_URI}/confirm/account`);
  } catch (err) {
    next(err);
  }
};

export const generateVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const newUuid = await Confirmation.create({
      userId: user._id,
      token: uuidv4(),
    });

    await newUuid.save();
    let mailDetails = {
      from: process.env.SENDER_MAIL_ID,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${user.fName}<p>Thank you for registering. Please confirm your email by clicking on the following link</p> <a href=${process.env.BACKEND_URI}/api/auth/verify/${user._id}> Click here to verify your account</a>`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        throw new Error("Mail not Sent , Please try registration again ", {
          cause: { status: 500 },
        });
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({
      status: "success",
      message: "Verification email sent successfully ",
    });
  } catch (err) {
    next(err);
  }
};
export const loginUserByEmail = async (req, res, next) => {
  try {
    const { username, password, type } = req.body;
    const user = await User.findOne({ [type]: username }).select(
      "-createdAt -updatedAt -__v"
    );

    if (!user)
      throw new Error("Incorrect email or phone number", {
        cause: { status: 400 },
      });

    if (user.status !== "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.hash);
    if (!isMatch)
      throw new Error("Incorrect password", { cause: { status: 400 } });
    const accessToken = generateJwtToken(user);
    return res.status(200).json({
      status: "success",
      message: "login successful",
      accessToken,
      user,
    });
  } catch (err) {
    next(err);
  }
};
export const fetchUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("roleid");
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const loginDetailsOne = async (req, res, next) => {
  try {
    const {
      fName,
      lName,
      email,
      mobileNumber,
      companyName,
      cfoServices,
      country,
      qboSupport,
      xeroSupport,
    } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        fName,
        lName,
        mobileNumber,
        companyName,
        country,
        cfoServices,
        qboSupport,
        xeroSupport,
      },
      { new: true }
    );
    return res.status(201).json({
      status: "success",
      message: "login details updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
export const createUser = async (req, res, next) => {
  const { email, fName, lName, mobileNumber, password, roleid } = req.body;
  try {
    let userExists = await User.findOne({ email: email });
    userExists =
      userExists || (await User.findOne({ mobileNumber: mobileNumber }));
    if (userExists) {
      throw new Error("user already exists with that phone or email", {
        cause: { status: 400 },
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      fName,
      lName,
      mobileNumber,
      roleid,
      usertype: "employee",
      hash: passwordHash,
      profilePic: req.file.filename,
    });
    await newUser.save();

    const newUuid = await Confirmation.create({
      userId: newUser._id,
      token: uuidv4(),
    });
    await newUuid.save();

    let mailDetails = {
      from: process.env.SENDER_MAIL_ID,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${fName}<p>Thank you for registering. Please confirm your email by clicking on the following link</p> <a href=${process.env.BACKEND_URI}/api/auth/verify/${newUser._id}> Click here to verify your account</a>`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        throw new Error("Mail not Sent , Please try registration again ", {
          cause: { status: 500 },
        });
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({
      status: "success",
      message:
        "Employee created successfully with verification email sent to his/her email address",
    });
  } catch (err) {
    next(err);
  }
};
export const fetchAllUsers = async (_, res, next) => {
  const users = await User.find({}).populate("roleid");
  try {
    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};
export const fetchAllUsersByCompany = async (req, res, next) => {
  const loggedInUser = await User.findById(req.user._id);
  const users = await User.find({ companyName: loggedInUser.companyName });
  try {
    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};
export const loginDetailsTwo = async (req, res, next) => {
  try {
    const {
      fName,
      lName,
      email,
      mobileNumber,
      companyName,
      country,
      industry,
      cfoServices,
      monthlyExpenses,
      accountingSoftware,
    } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        fName,
        lName,
        mobileNumber,
        companyName,
        country,
        industry,
        cfoServices,
        monthlyExpenses,
        accountingSoftware,
      },
      { new: true }
    );
    return res.status(201).json({
      status: "success",
      message: "login details updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const updatedBy = await User.findById(req.user._id);
    const user = await User.findById(req.params.userId);

    if (!updatedBy._id.equals(user._id) && updatedBy.usertype !== "admin") {
      return res.status(400).json({
        error: "invalid User ",
      });
    }

    const hashNewPassword = await bcrypt.hash(password, 10);
    user.hash = hashNewPassword;
    user.save();
    const accessToken = generateJwtToken(user);
    res.status(200).json({
      status: "success",
      message: "Password Updated Successfully",
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const inactiveStatus = async (req, res, next) => {
  try {
    const updatedBy = await User.findById(req.user._id);
    const user = await User.findById(req.params.id);

    if (!updatedBy._id.equals(user._id) && updatedBy.usertype !== "admin") {
      return res.status(400).json({
        error: "invalid User ",
      });
    }
    let status = req.body.status;
    if (status === "Active") {
      status = "InActive";
    } else if (status === "InActive") {
      status = "Active";
    }
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: data,
    });
  } catch (error) {
    next(error);
  }
};
