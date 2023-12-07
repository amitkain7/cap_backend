import express from "express";
const router = express.Router();
import { body } from "express-validator";
import validateReq from "../middlewares/validate-req.js";

import {
  registerUserWithEmail,
  loginUserByEmail,
  verifyUser,
  loginDetailsOne,
  generateVerificationEmail,
  loginDetailsTwo,
  fetchUserDetails,
  fetchAllUsers,
  updateUserDetails,
  createUser,
  fetchAllUsersByCompany,
  changePassword,
  inactiveStatus,
} from "../controllers/auth.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";

router.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("invalid email address")
      .notEmpty()
      .withMessage("email is required"),

    body("mobileNumber")
      .trim()
      .isMobilePhone()
      .withMessage("invalid phone number")
      .notEmpty()
      .withMessage("phone is required"),

    body("fName").notEmpty().withMessage("first name is required"),
    body("lName").notEmpty().withMessage("last name is required"),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 32,
      })
      .withMessage(
        "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
      )
      .notEmpty()
      .withMessage("password is required"),
  ],
  validateReq,
  registerUserWithEmail
);

router.post(
  "/login",
  [body("password").notEmpty().withMessage("password required")],
  validateReq,
  loginUserByEmail
);
router.get("/verify/:userId", verifyUser);
router.post("/verify/again", generateVerificationEmail);
router.post("/login/details/one", loginDetailsOne);
router.post("/login/details/two", loginDetailsTwo);
router.get("/users/read", fetchAllUsers);
router.get("/users/read/company", isUser, fetchAllUsersByCompany);
router.post(
  "/user/create",
  isUser,
  imageUpload.single("profilePic"),
  imageUpload._handleError,
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("invalid email address")
      .notEmpty()
      .withMessage("email is required"),

    body("mobileNumber")
      .trim()
      .isMobilePhone()
      .withMessage("invalid phone number")
      .notEmpty()
      .withMessage("phone is required"),

    body("fName").notEmpty().withMessage("first name is required"),
    body("lName").notEmpty().withMessage("last name is required"),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 32,
      })
      .withMessage(
        "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
      )
      .notEmpty()
      .withMessage("password is required"),
  ],
  createUser
);
router.post(
  "/user/change-password/:userId",
  isUser,
  [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("oldPassword is required"),
    body("newPassword")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 32,
      })
      .withMessage(
        "weak password, password should be 8-32 characters long with at least 1 uppercase, 1 lowercase, 1 number and 1 symbol"
      )
      .notEmpty()
      .withMessage("newPassword is required"),
  ],
  changePassword
);
router.patch(
  "/user/update/:userId",
  isUser,
  imageUpload.single("profilePic"),
  imageUpload._handleError,
  updateUserDetails
);
router.get("/user", isUser, fetchUserDetails);
export default router;
