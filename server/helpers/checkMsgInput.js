const checkMsgInput = (req, res, next) => {
  const {
    subject,
    message,
    status,
  } = req.body;
  if (subject === '' && message === '' && status === '') {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (subject === null && message === null && status === null) {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (subject === undefined && message === undefined && status === undefined) {
    res.status(400).json({
      status: 400,
      error: 'input fields cannot be empty',
    });
  } else if (subject === null || subject === '' || subject === undefined) {
    res.status(400).json({
      status: 400,
      error: 'subject cannot be empty',
    });
  } else if (message === null || message === '' || message === undefined) {
    res.status(400).json({
      status: 400,
      error: 'message cannot be empty',
    });
  }
  next();
};
export default checkMsgInput;
