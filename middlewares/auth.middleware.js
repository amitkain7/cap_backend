import jwt from "jsonwebtoken";

export const isUser = (req, _, next) => {
  try {
    const InvalidAccessTokenError = new Error("Invalid Access Token", {
      cause: { status: 403 },
    });
    if (!req?.headers?.authorization) throw InvalidAccessTokenError;

    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw InvalidAccessTokenError;


    const decoded = jwt.decode(token);
    if (!decoded) throw InvalidAccessTokenError;

    if (decoded?.exp < Date.now() / 1000)
      throw new Error("Access Token Expired", { cause: { status: 403 } });

    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!req.user) throw InvalidAccessTokenError;

    next();
  } catch (err) {
    next(err);
  }
};
export const isAdmin = (req, _, next) => {
  try {
    if (req?.user?.usertype !== "admin")
      throw new Error("Unauthorized", { cause: { status: 403 } });
    next();
  } catch (err) {
    next(err);
  }
};
