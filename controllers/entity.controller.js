import mongoose from "mongoose";
import User from "../models/user.model.js";
import Entity from "../models/entity.model.js";
import Institute from "../models/institute.model.js";
import { imageUpload } from "../middlewares/image-upload.middleware.js";
import bcrypt from "bcrypt";

export const AddEntity = async (req, res, next) => {
  try {
    const { entityName, adminName, email, phone, password } = req.body;
    const uploadedLogoFileName = req.files[0]?.filename;

    // Try to find the user by email if not found create new one
    const user = await User.findOne({ email });
    if (user)
      throw new Error("User Already Exists", {
        cause: { status: 400 },
      });
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fName: adminName,
      hash: hashPassword,
      email,
      mobileNumber: phone,
      usertype: "entity",
    });

    const newEntity = await Entity.create({
      name: entityName,
      admin: newUser._id,
      logo: uploadedLogoFileName,
      createdBy: req.user._id,
    });

    res.json({
      newEntity: newEntity,
      message: "Entity Created Success",
    });
  } catch (error) {
    next(error);
  }
};
export const UpdateEntity = async (req, res, next) => {
  try {
    const enityDocId = req.params.id;
    const { entityName, adminName, email, phone, filename } = req.body;
    const uploadedLogoFileName = req.files?.[0]?.filename;

    if (!mongoose.isValidObjectId(enityDocId))
      throw new Error("Entity not found", {
        cause: { status: 400 },
      });

    const updateObject = {
      $set: {
        fName: adminName,
        email,
        mobileNumber: phone,
      },
      $unset: {},
    };
    const updateObjectEntity = {
      $set: {
        name: entityName,
      },
      $unset: {},
    };

    if (!filename)
      if (uploadedLogoFileName)
        updateObjectEntity.$set.logo = uploadedLogoFileName;
      else updateObjectEntity.$unset.logo = 1;

    const oldEntity = await Entity.findByIdAndUpdate(
      { _id: enityDocId },
      {
        ...updateObjectEntity,
      },
      { new: false }
    );

    // Try to find the user by email
    const oldUser = await User.findByIdAndUpdate(
      { _id: oldEntity.admin },
      {
        ...updateObject,
      },
      { new: false }
    );

    // find previous filename
    const oldEntityLogoFileName = oldEntity.logo;

    // delete old one here
    imageUpload._delete(oldEntityLogoFileName);

    // return 200 response
    res.json({
      message: "Entity Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const FetchEntities = async (req, res, next) => {
  try {
    const entities = await Entity.find({ createdBy: req.user._id }).populate(
      "admin"
    );
    // Create an array to store entities with the count of associated institutes
    const entitiesWithInstituteCount = [];

    // Iterate through each entity and get the count of associated institutes
    if (Array.isArray(entities)) {
      for (const entity of entities) {
        const instituteCount = await Institute.countDocuments({
          entityId: entity._id,
        });

        // Add the entity with the institute count to the array
        entitiesWithInstituteCount.push({
          ...entity.toObject(),
          instituteCount: instituteCount,
        });
      }
    }

    res.json({
      message: "Success",
      entities: entitiesWithInstituteCount,
    });
  } catch (error) {
    next(error);
  }
};

export const ToggleEntityStatus = async (req, res, next) => {
  try {
    const entityDocId = req.params.id;
    // if isActive true than we set status to "Active" else "InActive"
    const { isActive } = req.body;

    if (!mongoose.isValidObjectId(entityDocId))
      throw new Error("Invalid entity.", {
        cause: { status: 400 },
      });

    const entity = await Entity.findByIdAndUpdate(
      { _id: entityDocId },
      { $set: { status: !isActive ? "Active" : "InActive" } },
      { new: true }
    );
    if (!entity)
      throw new Error("No entity found.", {
        cause: { status: 400 },
      });

    res.json({
      message: "Status Changed",
      updatedEntity: entity,
    });
  } catch (error) {
    next(error);
  }
};

export const SearchEntity = async (req, res, next) => {
  try {
    const searchText = req.params.text;

    const regex = new RegExp(searchText, "i"); // 'i' makes the search case-insensitive

    const entities = await Entity.find({
      name: { $regex: regex },
      createdBy: req.user._id,
    });

    res.json({
      entities,
    });
  } catch (error) {
    next(error);
  }
};
