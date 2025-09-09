import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
import authRoutes from "./routes/authRoutes";
import Database from "./db/sequelize";
import translateRoutes from "./routes/translateRoutes";
import { API_PREFIX } from "./constants/ApiPrefix";

const app = express();
app.use(bodyParser.json());

// Initialize DB connection
Database.getInstance()
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Routes
app.use(API_PREFIX.AUTH, authRoutes);
app.use(API_PREFIX.USERS, userRoutes);
app.use(API_PREFIX.ROOMS, roomRoutes);
app.use(API_PREFIX.MESSAGES, messageRoutes);
app.use(API_PREFIX.TRANSLATE, translateRoutes);

export default app;
