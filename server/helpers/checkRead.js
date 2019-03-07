import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import messages from '../db/messages';

dotenv.config();
const checkDraft = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // Decode token
  const decoded = jwt.verify(token, process.env.SECRET);
  const result = messages.filter(user => user.email === decoded.email);
  const result2 = result.map(a => a.status);
  if (result2.includes('draft') || result2.includes('read') || result2.includes('sent')) {
    res.status(400).json({
      status: 400,
      error: 'status can not be be draft, sent or read to access this route',
    });
  }
  return next();
};
export default checkDraft;
