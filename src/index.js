// Modules
const express = require("express");
// const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const middleware = require("./middleware/errors.middleware.js");

// Server Setup
const app = express();
const port = process.env.port || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

// Routes
const authRoutes = require("./routes/auth.routes.js");
const budgetsRoutes = require("./routes/budgets.routes.js");
const expensesRoutes = require("./routes/expenses.routes.js");
const userRoutes = require("./routes/users.routes.js");

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle Routes
const BASE_URL = "/api";
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/budgets`, budgetsRoutes);
app.use(`${BASE_URL}/expenses`, expensesRoutes);
app.use(`${BASE_URL}/user`, userRoutes);

// Handle Errors, 404 and 500
app.use(middleware.error404);
app.use(middleware.error500);

// Start server and listen on port
app.listen(port, function () {
  console.log(`Fiscal-Fox server running on port: ${port}...`);
});
