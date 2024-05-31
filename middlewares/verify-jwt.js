const jwt = require('jsonwebtoken');
const secretKey = "YourJWTSecretKey"; // Replace with your actual secret key

const verifyJwt = (req, res, next) => {
  const token = req.headers['authorization'];

  // const bearerHeader = req.headers['authorization'];
  // if( typeof bearerHeader !== 'undefined'){
  //   const bearer = bearerHeader.split(" ");
  //   const token = bearer[1];
  //   req.token = token;
  //   next();
  // }else{
  //   response.send({
  //     result: 'Token is invalid' 
  //   })
  // }
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // If everything is good, save to request for use in other routes
    req.user = decoded;
  });
};

module.exports = verifyJwt;
