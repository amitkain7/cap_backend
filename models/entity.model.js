import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const validators = {
  validateUserEntity: {
    validator: (data) => !(this.usertype === "entity" && !data),
    message: "apiKey and apiSecret is required for userType 'entity'",
  },
};

const entitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    logo: {
      type: String,
    },
    apiKey: {
      type: String,
      validate: validators.validateUserEntity,
    },
    apiSecret: {
      type: String,
      validate: validators.validateUserEntity,
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active"
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

function generateSecretHash(key) {
  const salt = randomBytes(8).toString("hex");
  const buffer = scryptSync(key, salt, 64);
  return `${buffer.toString("hex")}.${salt}`;
}

// Mongoose middleware to run before save
entitySchema.pre("save", async function (next) {
  // Only generate apiKey and apiSecret if usertype is "entity" and they are not already provided
  if (!this.apiKey || !this.apiSecret) {
    this.apiKey = uuidv4();
    this.apiSecret = generateSecretHash(this.apiKey);
  }

  next();
});

const Entity = mongoose.model("Entity", entitySchema);
export default Entity;
