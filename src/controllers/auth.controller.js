import { UserModel } from "../sequelize/models/user.model.js";
import { secret } from "../config/auth.config.js";
import { compareSync } from "bcrypt";

import pkg from "jsonwebtoken";
const { sign } = pkg;

export function register(req, res) {
  console.log("Request - Register User");
  console.log("Register - User: " + req.body.username);
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
}

export function login(req, res) {
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
      var passwordIsValid = compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: errorMsg,
        });
      }

      // Generate token
      var accessToken = sign(
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
}

export function validateToken(req, res) {
  const errorMsg = "Invalid Request.";
  console.log("Request - Validate Token");

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
}

export function logout(req, res) {
  // Log the request
  console.log("Request - Logout");
  res.status(200).send({ isAuth: false });
}
