const { UserModel } = require("../sequelize/models/user.model.js");
const { secret } = require("../config/auth.config.js");
const bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  console.log("Request - Register User");
  // Save User to Database
  UserModel.create({
    username: req.body.username,
    // Hash hooked into model
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  })
    .then((user) => {
      if (user) {
        res.status(201).send("Registration Successful.");
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  console.log("Request - Login");
  UserModel.findOne({
    where: {
      username: req.body.username,
    },
  })
    // Check username
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      //Check password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Credentials",
        });
      }

      // Generate token
      var accessToken = jwt.sign(
        { id: user.id },
        secret,
        { expiresIn: 86400 } // 24 hours
      );

      // Respond
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: accessToken,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.logout = function (req, res) {
  console.log("Request - Logout");
};
