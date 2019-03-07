const checkReceived = (req, res, next) => {
  const {
    status,
  } = req.body;
  if (status !== 'sent') {
    return res.status(400).json({
      status: 400,
      error: 'status must be sent to access this route',
    });
  }
  return next();
};
export default checkReceived;
