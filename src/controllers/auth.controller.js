const { UserModel } = require("../sequelize/models/user.model.js");
const { validationResult } = require("express-validator");
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
        res.status(201).send({ isRegistered: true });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  const errorMsg = "Invalid Request.";
  console.log("Request - Login");

  // Missing login data, do nothing
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: errorMsg });
  }
  // Check for user
  UserModel.findOne({
    where: {
      username: req.body.username,
    },
  })
    // Check username
    .then((user) => {
      if (!user) {
        // If none was found, return generic error
        return res.status(400).send({ message: errorMsg });
      }

      //Check password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: errorMsg,
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
        token: accessToken,
      });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.validateToken = (req, res) => {
  const errorMsg = "Invalid Request.";
  console.log("Request - Validate Token");
  console.log(req.userId);

  if (req.userId) {
    // Check for user
    UserModel.findOne({
      where: {
        id: req.userId,
      },
    })
      // Check user exists
      .then((user) => {
        if (!user) {
          // If none was found, return generic error
          return res.status(400).send({ message: errorMsg });
        }

        // Respond
        res.status(200).send();
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};

exports.logout = function (req, res) {
  // Log the request
  console.log("Request - Logout");
};
