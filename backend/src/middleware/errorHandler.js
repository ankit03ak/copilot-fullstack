module.exports = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    error: err.name || 'Error',
    message: err.message || 'Something went wrong'
  });
};
