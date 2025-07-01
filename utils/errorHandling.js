const handleError = (res, error, statusCode = 500, message = "Something went wrong") => {
  console.error("Error:", error);

  res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error,
  });
};

module.exports = handleError;
