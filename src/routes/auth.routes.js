const {
  login,
  logout,
  register,
} = require("../controllers/auth.controller.js");
const {
  checkDuplicateEmail,
  checkDuplicateUserName,
} = require("../middleware/register.middleware.js");
const express = require("express");

const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post(
  "/register",
  [checkDuplicateUserName, checkDuplicateEmail],
  register
);

module.exports = authRoutes;
