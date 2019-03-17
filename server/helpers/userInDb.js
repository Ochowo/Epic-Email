import db from '../db/index';

const userExists = (req, res, next) => {
  const {
    receiverEmail,
  } = req.body;
  const query = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [`${receiverEmail}`],
  };
  db.query(query, (err, result) => {
    if (result.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: `the email ${receiverEmail} does not exist.`,
      });
    }
    return next();
  });
};
export default userExists;
