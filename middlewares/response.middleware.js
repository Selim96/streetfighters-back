const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  const {data} = res;
  const error = res.err;
  
  if (error) {
    res.status(400).json({error: true, message: error.message})
  } else if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({error: true, message: 'Not found'})
  }
  
  next();
};

export { responseMiddleware };
