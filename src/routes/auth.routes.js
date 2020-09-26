const {
  login,
  logout,
  register,
} = require("../controllers/auth.controller.js");
const {
  checkDuplicateEmail,
  checkDuplicateUserName,
} = require("../middleware/register.middleware.js");
const { check } = require("express-validator");
const express = require("express");
const { verifyToken } = require("../middleware/authJwt.middleware");

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/logout", verifyToken, logout);
authRoutes.post(
  "/register",
  [check("email").isEmail(), checkDuplicateUserName, checkDuplicateEmail],
  register
);

module.exports = authRoutes;
