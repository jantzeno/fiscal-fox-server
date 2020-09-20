const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");
const express = require("express");

const userRoutes = express.Router();
/**
 * Routes for a user by id. Evalutes to `/user/:userId`.
 */
userRoutes
  .get("/:userId", getUser)
  .put("/:userId", updateUser)
  .delete("/:userId", deleteUser);

module.exports = userRoutes;
