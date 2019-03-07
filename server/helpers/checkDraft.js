const checkDraft = (req, res, next) => {
  const {
    status,
  } = req.body;
  if (status !== 'draft') {
    return res.status(400).json({
      status: 400,
      error: 'status must be draft to access this route',
    });
  }
  return next();
};
export default checkDraft;
