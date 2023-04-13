
 import jwt from "jsonwebtoken";
 import { createError } from "./error.js";

 export const verifyToken = async(req, res, next) => {
//   // Get the access token from the request headers
const authHeader = req.headers.authorization;
  const authHeader9 = authHeader.split(' ');
  const authHeader1 = authHeader9[1];
  const token = authHeader1 || req.cookies.token;


  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  // Verify the access token
  const decoded = jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
    if (err) {
      return res.status(403).send('Access token is invalid');
    }

    // Store the user object in the request object for use in later middleware or route handlers
    req.user = user;
    req.user.id = user.id;
    console.log(req.user.id)
    next();
  });
 };


// export function verifyToken(req, res, next) {
  
// }
