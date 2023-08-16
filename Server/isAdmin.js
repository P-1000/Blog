import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authHeader9 = authHeader.split(' ');
  const authHeader1 = authHeader9[1];
  const token = authHeader1 || req.cookies.token;

  if (!token) {
    return res.status(401).send('Access token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === 'hashira') {
      req.user = decoded; // todo store the user info in req.user for later user also : bro 
      next();
    } else {
      return res.status(401).send('Access forbidden for non-admin users');
    }
  } catch (error) {
    return res.status(401).send('Access token is invalid');
  }
};
