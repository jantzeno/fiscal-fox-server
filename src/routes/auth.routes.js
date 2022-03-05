import { login, logout, register, validateToken } from "../controllers/auth.controller.js";
import { checkDuplicateEmail, checkDuplicateUserName } from "../middleware/register.middleware.js";
import { check } from "express-validator";
import { Router } from "express";
import { verifyToken } from "../middleware/authJwt.middleware.js";

const authRoutes = Router();

authRoutes.get("/login", verifyToken, validateToken).post("/login", login);
authRoutes.get("/logout", verifyToken, logout);
authRoutes.post("/register", [check("email").isEmail(), checkDuplicateUserName, checkDuplicateEmail], register);

export default authRoutes;
