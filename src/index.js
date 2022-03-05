// Modules
import express, { urlencoded, json } from "express";
import logger from "morgan";
import cors from "cors";
import { error404, error500 } from "./middleware/errors.middleware.js";

// Server Setup
const app = express();
// export port=[PORT]; npm run start
const port = process.env.port || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

// Routes
import authRoutes from "./routes/auth.routes.js";
import budgetsRoutes from "./routes/budgets.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";
import userRoutes from "./routes/users.routes.js";

// Reset the database - Helpful to have during API testing
// const { connection } = require("./config/db.config");
// connection
//   .sync({ force: true })
//   .then(() => console.log("Database Sync'd"))
//   .catch((error) => console.log("Database error: ", error));

// Allow localhost server calls from browser
app.use(cors());

// Log requests to console
app.use(logger(logLevel));

// Parse incoming requests
app.use(urlencoded({ extended: false }));
app.use(json());

// Handle Routes
const BASE_URL = "/api";
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/budgets`, budgetsRoutes);
app.use(`${BASE_URL}/expenses`, expensesRoutes);
app.use(`${BASE_URL}/user`, userRoutes);

// Handle Errors, 404 and 500
app.use(error404);
app.use(error500);

// Start server and listen on port
app.listen(port, function () {
  console.log(`Fiscal-Fox server running on port: ${port}...`);
});
