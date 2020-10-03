const { secret } = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Trim 'Bearer ' from token
  var token = undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(403).send({
      isAuth: false,
      message: "Error: No token provided.",
    });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          isAuth: false,
          message: "Error: Failed to Authenticate. " + err,
        });
      }
      req.userId = decoded.id;
      next();
    });
  }
};
