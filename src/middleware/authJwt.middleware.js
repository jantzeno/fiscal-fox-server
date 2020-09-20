const { secret } = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      isAuth: false,
      message: "Error: No token provided.",
    });
  }

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
};
