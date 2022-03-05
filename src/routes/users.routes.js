import { getUser, updateUser, updatePassword, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authJwt.middleware.js";
import { Router } from "express";

const userRoutes = Router();
/**
 * Routes for a user by id. User id is pulled from passed JWT token.
 * Evalutes to `/user/`.
 */
userRoutes.get("/", verifyToken, getUser).put("/", verifyToken, updateUser).delete("/", verifyToken, deleteUser);

/**
 * Routes for a user by id. User id is pulled from passed JWT token.
 * Evalutes to `/user/update_security`.
 */
userRoutes.put("/update_security/:newPassword", verifyToken, updatePassword);

export default userRoutes;
