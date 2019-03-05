const checkSignInInput = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  if (email === '' && password === '') {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (email === null && password === null) {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (email === undefined && password === undefined) {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (password === null || password === '' || password === undefined || password < 6) {
    res.status(400).json({
      status: 400,
      error: 'password cannot be less than 6 characters',
    });
  }
  next();
};
export default checkSignInInput;
