import db from '../db/index';

const userExists = (req, res, next) => {
  const {
    email,
  } = req.body;
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [`${email}`],
  };
  db.query(query, (err, result) => {
    if (err) {
      res.status(409).json({
        status: 409,
        error: `The email ${email} already exists`,
      });
    }
    if (result.rowCount > 0) {
      return res.status(409).json({
        status: 409,
        error: `the email ${email} is already in use`,
      });
    }
    return next();
  });
};
export default userExists;
