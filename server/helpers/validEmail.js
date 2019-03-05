const validEmail = (req, res, next) => {
  const {
    email,
  } = req.body;
  if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid email address',
    });
  }
  return next();
};
export default validEmail;
