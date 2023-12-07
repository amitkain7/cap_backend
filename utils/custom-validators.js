import { check } from "express-validator";

export const validateInt = (key, config) => {
  let newConfig = {
    ...config,
    min: !config?.min && !config?.required ? 0 : config?.min || 1,
    max: config?.max || Infinity,
  };
  if (!config?.required)
    return check(key)
      .optional()
      .isInt(newConfig)
      .withMessage(
        `${key} must be between ${newConfig?.min}-${newConfig?.max}`
      );

  return check(key)
    .isInt(newConfig)
    .withMessage(`${key} must be between ${newConfig?.min}-${newConfig?.max}`)
    .notEmpty()
    .withMessage(`${key} required`);
};

export const validateNumber = (key, config) => {
  let newConfig = {
    ...config,
    min: !config?.min && !config?.required ? 0 : config?.min || 0.1,
    max: config?.max || Infinity,
  };

  if (!config?.required)
    return check(key)
      .optional()
      .isNumeric(newConfig)
      .withMessage(
        `${key} must be between ${newConfig?.min}-${newConfig?.max}`
      );

  return check(key)
    .isNumeric(newConfig)
    .withMessage(`${key} must be between ${newConfig?.min}-${newConfig?.max}`)
    .notEmpty()
    .withMessage(`${key} required`);
};
export const validateString = (key, config) => {
  let newConfig = {
    ...config,
    min: !config?.min && !config?.required ? 0 : config?.min || 1,
    max: config?.max || 500,
  };

  if (!config?.required)
    return check(key)
      .optional()
      .isLength(newConfig)
      .withMessage(
        `${key} must be ${newConfig?.min}-${newConfig?.max} characters`
      );
  return check(key)
    .isLength(newConfig)
    .withMessage(
      `${key} must be ${newConfig?.min}-${newConfig?.max} characters`
    )
    .notEmpty()
    .withMessage(`${key} required`);
};
export const validateBoolean = (key, required = false) => {
  if (!required)
    return check(key)
      .optional()
      .isBoolean()
      .withMessage(`${key} must be true or false`);
  return check(key)
    .isBoolean()
    .withMessage(`${key} must be true or false`)
    .notEmpty()
    .withMessage(`${key} required`);
};

export const validateArray = (key, required = false) => {
  if (!required)
    return check(key)
      .optional()
      .isArray()
      .withMessage(`${key} must be an array`);
  return check(key)
    .isArray()
    .withMessage(`${key} must be an array`)
    .notEmpty()
    .withMessage(`${key} required`);
};

export const validateDate = (key, required = false) => {
  if (!required)
    return check(key)
      .optional()
      .isDate({ format: "YYYY-MM-DD" }) // TODO: this was changed from "DD-MM-YYYY"
      .withMessage(`${key} must be a valid date, format YYYY-MM-DD`);
  return check(key)
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage(`${key} must be a valid date, format YYYY-MM-DD`)
    .notEmpty()
    .withMessage(`${key} required`);
};

export const validatePhone = (key, required = false) => {
  if (!required)
    return check(key)
      .optional()
      .isMobilePhone()
      .withMessage("invalid phone number");

  return check(key)
    .isMobilePhone()
    .withMessage("invalid phone number")
    .notEmpty()
    .withMessage(`${key} required`);
};
export const validateEmail = (key, required = false) => {
  if (!required)
    return check(key)
      .optional()
      .toLowerCase()
      .isEmail()
      .withMessage("invalid email id");

  return check(key)
    .toLowerCase()
    .isEmail()
    .withMessage("invalid email id")
    .notEmpty()
    .withMessage(`${key} required`);
};
export const validatePassword = (key, required = false) => {
  if (!required)
    return check("password")
      .optional()
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
      );
  return check("password")
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
    .withMessage("password is required");
};

export const validateOtp = (key) => {
  return check(key)
    .isLength({ max: 6, min: 6 })
    .withMessage("otp should be of 6 digits")
    .isNumeric()
    .withMessage("invalid otp")
    .notEmpty()
    .withMessage("otp required");
};

export const validateMongoId = (key, required = false) => {
  if (!required)
    return check(key).optional().isMongoId().withMessage(`invalid ${key}`);

  return check(key)
    .isMongoId()
    .withMessage(`invalid ${key}`)
    .notEmpty()
    .withMessage(`${key} required`);
};
export const validateColor = (key, required = false) => {
  if (!required)
    return check(key).optional().isHexColor().withMessage(`invalid ${key}`);

  return check(key)
    .isHexColor()
    .withMessage(`invalid ${key}`)
    .notEmpty()
    .withMessage(`${key} required`);
};

export const validateGeoLocation = (key, required = false) => {
  if (!required)
    return check(key)
      .optional()
      .custom((value) => {
        if (!value?.lat || !value?.lng) throw new Error("invalid geo location");
        return true;
      });
  return check(key).custom((value) => {
    if (!value?.lat || !value?.lng) throw new Error("invalid geo location");
    return true;
  });
};

export const validateApartmentPrices = (key, required = false) => {
  if (!required) return check(key).optional().custom(checkApartmentPrices);
  return check(key)
    .custom(checkApartmentPrices)
    .withMessage("invalid apartment price")
    .notEmpty()
    .withMessage(`${key} required`);
};

export const validateEnum = (key, type, required = false) => {
  if (!type?.enum || !key)
    throw new Error("invalid or no (type or key) passed to validate");
  if (!required)
    return check(key)
      .optional()
      .toLowerCase()
      .isIn(type.enum)
      .withMessage(`${key} can be - ${type.enum.join(" | ")}`);
  return check(key)
    .isIn(type.enum)
    .toLowerCase()
    .withMessage(`${key} can be - ${type.enum.join(" | ")}`)
    .notEmpty()
    .withMessage(`${key} required`);
};
export const validateEnumWithCase = (key, type, required = false) => {
  if (!type?.enum || !key)
    throw new Error("invalid or no (type or key) passed to validate");
  if (!required)
    return check(key)
      .optional()
      .isIn(type.enum)
      .withMessage(`${key} can be - ${type.enum.join(" | ")}`);
  return check(key)
    .isIn(type.enum)
    .withMessage(`${key} can be - ${type.enum.join(" | ")}`)
    .notEmpty()
    .withMessage(`${key} required`);
};

function checkApartmentPrices(value) {
  try {
    if (!value?.occupancy || parseInt(value?.occupancy) < 1)
      throw new Error("invalid apartment prices occupancy");
    if (!value?.price || parseFloat(value?.price) < 1)
      throw new Error("invalid apartment prices price");
    if (!value?.discountedPrice || parseFloat(value?.discountedPrice) < 1)
      throw new Error("invalid apartment prices discounted price");
    return true;
  } catch (err) {
    throw new Error("invalid apartment price");
  }
}
