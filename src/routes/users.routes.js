const {
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../middleware/authJwt.middleware");
const { validationResult } = require("express-validator");
const express = require("express");

const userRoutes = express.Router();
/**
 * Routes for a user by id. User id is pulled from passed JWT token.
 * Evalutes to `/user/`.
 */
userRoutes
  .get("/", verifyToken, getUser)
  .put("/", verifyToken, updateUser)
  .delete("/", verifyToken, deleteUser);

/**
 * Routes for a user by id. User id is pulled from passed JWT token.
 * Evalutes to `/user/update_security`.
 */
userRoutes.put("/update_security/:newPassword", verifyToken, updatePassword);

module.exports = userRoutes;
