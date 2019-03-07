const checkSignUpInput = (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    password,
  } = req.body;
  if (email === '' && firstName === '' && lastName === '' && password === '') {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (email === null && firstName === null && lastName === null && password === null) {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (email === undefined && firstName === undefined && lastName
      === undefined && password === undefined) {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (firstName === null || firstName === '' || firstName === undefined) {
    res.status(400).json({
      status: 400,
      error: 'firstname cannot be empty',
    });
  } else if (lastName === null || lastName === '' || lastName === undefined) {
    res.status(400).json({
      status: 400,
      error: 'lastname cannot be empty',
    });
  } else if (password === null || password === '' || password === undefined || password < 6) {
    res.status(400).json({
      status: 400,
      error: 'password cannot be less than 6 characters',
    });
  }
  return next();
};
export default checkSignUpInput;
