import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const wrongToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: 'Failed to authenticate user token.',
      });
    }
    return next();
  });
};
export default wrongToken;
