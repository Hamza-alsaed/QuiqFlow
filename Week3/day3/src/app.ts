import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
import authRoutes from "./routes/authRoutes";
import Database from "./db/sequelize";
import { authenticate } from "./middleware/auth";

const app = express();
app.use(bodyParser.json());

// Initialize DB
Database.getInstance()
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Public auth routes
app.use("/auth", authRoutes);

// Secure /rooms & /messages
app.use("/rooms", authenticate, roomRoutes);
app.use("/messages", authenticate, messageRoutes);

// Existing /users routes
app.use("/users", userRoutes);

export default app;
