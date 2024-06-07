import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    req.user.id = decoded.id;
    // console.log(req.user.id)
    next();
  } catch (error) {
    return res.status(403).send("Access token is invalid");
  }
};
