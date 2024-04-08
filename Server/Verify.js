import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = async (req, res, next) => {
  // Get the access token from the request headers
  let token;
  if(!req.headers.authorization){
    return res.status(401).send("Access Denied")
  }
  if(req.headers.authorization.startsWith('Bearer')){
    const authHeader = req.headers.authorization;
    token = authHeader.substring(7, authHeader.length);
  }
    token = token || req.cookies.token;

  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  // Verify the access token
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Access token is invalid');
    }
    req.user = user;
    req.user.id = user.id;
    next();
  });
};
