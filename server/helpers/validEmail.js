const validEmail = (req, res, next) => {
  const {
    email,
  } = req.body;
  const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
  if (email === '' || email === null || email === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'email cannot be empty',
    });
  }
  if (!regex.test(email)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid email address',
    });
  }
  return next();
};
export default validEmail;