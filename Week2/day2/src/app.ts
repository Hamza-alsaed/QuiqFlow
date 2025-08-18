import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import notesRoutes from "./routes/notes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/notes", notesRoutes);

// Health check
app.get("/", (req, res) => res.send("Notes API is running!"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
