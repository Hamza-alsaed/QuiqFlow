import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
import authRoutes from "./routes/authRoutes";
import Database from "./db/sequelize";

const app = express();
app.use(bodyParser.json());

// Initialize DB connection
Database.getInstance()
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);
app.use("/auth", authRoutes); // Use auth routes from constants if desired

export default app;
