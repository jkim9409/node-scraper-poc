const errorHandler = (err, req, res, next) => {
  // Log the error
  console.log(`[${req.id}] ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Determine the response format based on the request's Accept header or URL
  const acceptFormats = req.accepts(['html', 'json']);
  if (!acceptFormats) {
    res.status(406).send('Not Acceptable');
    return;
  }

  if (acceptFormats === 'json') {
    // Respond with JSON for API clients
    res.status(err.status || 500).send({
      error: {
        message: req.app.get('env') === 'development' ? err.message : 'Something went wrong!',
        ...(req.app.get('env') === 'development' && { stack: err.stack }), // Include stack trace in development mode
      },
    });
  } else {
    // Respond with HTML for browsers
    res.status(err.status || 500);
    res.render('error', { error: err });
  }
};

module.exports = errorHandler;