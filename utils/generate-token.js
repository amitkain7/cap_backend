import jwt from "jsonwebtoken";
export const generateJwtToken = (user) =>
  jwt.sign(
    { _id: user._id, usertype: user.usertype },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  
export const verifyJwtToken = (token) => {
  try {
    const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userId;
  } catch (error) {
    console.log("Error with JWT", error.message);
  }
};
