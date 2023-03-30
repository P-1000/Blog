
 import jwt from "jsonwebtoken";
 import { createError } from "./error.js";

 export const verifyToken = (req, res, next) => {
//   // Get the access token from the request headers
const authHeader = req.headers.authorization;
  const authHeader1 = authHeader.split(' ')[1];
  const token = authHeader1 || req.cookies.token;
  console.log(token)

  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  // Verify the access token
  jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
    if (err) {
      return res.status(403).send('Access token is invalid');
    }

    // Store the user object in the request object for use in later middleware or route handlers
    req.user = user;
    next();
  });
 };


// export function verifyToken(req, res, next) {
  
// }
