import users from '../db/users';

const userExists = (req, res, next) => {
  const {
    email,
  } = req.body;
  const result = users.map(user => user.email);
  if (result.includes(email)) {
    return res.status(409).json({
      status: 409,
      error: `the email ${email} already exists, please choose another email.`,
    });
  }
  return next();
};
export default userExists;
