import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notes.js";

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); // 
// Routes
app.use("/notes", notesRoutes);

// Health check
app.get("/", (_req, res) => res.send("Notes API is running!"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
