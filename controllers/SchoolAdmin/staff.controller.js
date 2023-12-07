import mongoose from "mongoose";
import Staff from "../../models/SchoolAdmin/staff.model.js";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const createStaff = async (req, res, next) => {
  const {
    staffNo,
    fName,
    lName,
    dob,
    gender,
    doj,
    branch,
    department,
    businessTitle,
    designation,
    employmentType,
    contractStartDate,
    contractLastDate,
    employmentGrade,
    probationPeriod,
    probationPeriodUnit,
    manager,
    roleId,
    password,
    employeeStatus,
    maritalStatus,
    noOfChildren,
    fatherName,
    motherName,
    spouseName,
    bloodGroup,
    nationality,
    emailAddress,
    phoneNumber,
    homePhone,
    addressLine1,
    addressLine2,
    zipCode,
    country,
    state,
    city,
    emergencyContactName,
    emergencyContactNumber,
    qualification,
    previousExperience,
    yearsOfExperience,
    bankName,
    beneficiaryName,
    bankAccountNo,
    ifscCode,
    salaryInformation,
    payFrequency,
    taxDeduction,
    deductions,
  } = req.body;

  try {
    const pe = previousExperience.map((item) => {
      if (!item.employmentType) {
        const { employmentType, ...newItem } = item;
        return newItem;
      }

      return item;
    });
    const photo = req.file.filename;
    let userExists = await User.findOne({ email: emailAddress });
    userExists =
      userExists || (await User.findOne({ mobileNumber: phoneNumber }));
    if (userExists) {
      throw new Error("user already exists with that phone or email", {
        cause: { status: 400 },
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: emailAddress,
      fName: fName,
      lName: lName,
      mobileNumber: phoneNumber,
      status: "Active",
      roleId: roleId,
      usertype: "Staff",
      hash: password,
    });
    // await newUser.save();

    const newStaff = await Staff.create({
      staffNo,
      fName,
      lName,
      dob,
      ...(gender && { gender }),
      doj,
      hash: passwordHash,
      branch,
      department,
      businessTitle,
      designation,
      ...(employmentType && { employmentType }),
      contractStartDate,
      contractLastDate,
      ...(employmentGrade && { employmentGrade }),
      ...(probationPeriod && { probationPeriod }),
      ...(probationPeriodUnit && { probationPeriodUnit }),
      manager,
      ...(employeeStatus && { employeeStatus }),
      ...(photo && { photograph: photo }),
      ...(maritalStatus && { maritalStatus }),
      noOfChildren,
      fatherName,
      motherName,
      spouseName,
      ...(bloodGroup && { bloodGroup }),
      nationality,
      emailAddress,
      phoneNumber,
      homePhone,
      addressLine1,
      addressLine2,
      zipCode,
      country,
      state,
      city,
      emergencyContactName,
      emergencyContactNumber,
      qualification,
      previousExperience: pe,
      yearsOfExperience,
      bankName,
      beneficiaryName,
      bankAccountNo,
      ifscCode,
      salaryInformation,
      ...(payFrequency && { payFrequency }),
      taxDeduction,
      ...(deductions && { deductions }),
      createdBy: req.user._id,
    });
    await newStaff.save();
    res.status(201).json({
      status: "success",
      message: "Staff created successfully",
      newStaff,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStaff = async (req, res, next) => {
  const {
    staffNo,
    fName,
    lName,
    dob,
    gender,
    doj,
    branch,
    department,
    businessTitle,
    designation,
    employmentType,
    contractStartDate,
    contractLastDate,
    employmentGrade,
    probationPeriod,
    probationPeriodUnit,
    manager,
    roleId,
    employeeStatus,
    maritalStatus,
    noOfChildren,
    fatherName,
    motherName,
    spouseName,
    bloodGroup,
    nationality,
    emailAddress,
    phoneNumber,
    homePhone,
    addressLine1,
    addressLine2,
    zipCode,
    country,
    state,
    city,
    emergencyContactName,
    emergencyContactNumber,
    qualification,
    previousExperience,
    yearsOfExperience,
    bankName,
    beneficiaryName,
    bankAccountNo,
    ifscCode,
    salaryInformation,
    payFrequency,
    taxDeduction,
    deductions,
  } = req.body;

  try {
    const pe = previousExperience.map((item) => {
      if (!item.employmentType) {
        const { employmentType, ...newItem } = item;
        return newItem;
      }

      return item;
    });
    const updatedBy = await User.findById(req.user._id);
    const staffUser = await Staff.findById(req.params.id).populate("userId");
    const updatedUserById = await User.findById(staffUser.userId._id);
    const photo = req?.file?.filename;

    if (
      !updatedBy._id.equals(updatedUserById._id) &&
      updatedBy.usertype !== "admin" &&
      updatedBy.usertype !== "School Admin"
    ) {
      return res.status(400).json({
        error: "invalid User",
      });
    }
    console.log("user Validation Check");

    const updateUser = await User.findByIdAndUpdate(
      staffUser.userId._id,
      {
        email: emailAddress,
        fName: fName,
        lName: lName,
        mobileNumber: phoneNumber,
        status: "Active",
        roleId: roleId,
        usertype: "Staff",
      },
      { new: true }
    );

    console.log("User Updated");
    const updateStaffById = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        staffNo,
        fName,
        lName,
        dob,
        ...(gender && { gender }),
        doj,
        branch,
        department,
        businessTitle,
        designation,
        ...(employmentType && { employmentType }),
        contractStartDate,
        contractLastDate,
        ...(employmentGrade && { employmentGrade }),
        ...(probationPeriod && { probationPeriod }),
        probationPeriodUnit,
        manager,
        ...(employeeStatus && { employeeStatus }),
        photograph: photo,
        ...(maritalStatus && { maritalStatus }),
        noOfChildren,
        fatherName,
        motherName,
        spouseName,
        ...(bloodGroup && { bloodGroup }),
        nationality,
        emailAddress,
        phoneNumber,
        homePhone,
        addressLine1,
        addressLine2,
        zipCode,
        country,
        state,
        city,
        emergencyContactName,
        emergencyContactNumber,
        qualification,
        previousExperience: pe,
        yearsOfExperience,
        bankName,
        beneficiaryName,
        bankAccountNo,
        ifscCode,
        salaryInformation,
        ...(payFrequency && { payFrequency }),
        taxDeduction,
        ...(deductions && { deductions }),
        createdBy: req.user._id,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Staff Updated Successfully",
      user: updateStaffById,
    });
  } catch (error) {
    next(error);
  }
};

export const getStaffData = async (req, res, next) => {
  try {
    const staff = await Staff.find({}).populate("roleId");
    res.status(201).json({
      status: "success",
      message: "Staff fetched successfully",
      staff,
    });
  } catch (error) {
    next(error);
  }
};

export const getStaffDataById = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("roleId");
    res.status(201).json({
      status: "success",
      message: "Staff fetched successfully",
      staff,
    });
  } catch (error) {
    next(error);
  }
};
