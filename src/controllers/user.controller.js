const { UserModel } = require("../sequelize/models/user.model.js");
const config = require("../config/auth.config.js");

var jwt = require("jsonwebtoken");

exports.getUser = (req, res) => {
  const msg = "User - Get User";
  console.log(msg);
  res.status(200).send(msg);
};

exports.updateUser = (req, res) => {
  const msg = "User - Update User";
  console.log(msg);
  res.status(200).send(msg);
};

exports.deleteUser = (req, res) => {
  const msg = "User - Delete User";
  console.log(msg);
  res.status(200).send(msg);
};
