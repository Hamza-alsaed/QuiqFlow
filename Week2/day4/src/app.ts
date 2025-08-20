import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notesRoutes from './routes/notes.js';
import translateRoutes from "./routes/translateRoutes.js";
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes);
app.use("/translate", translateRoutes);

// Error middleware (must be last)
app.use(errorHandler);

// Health check
app.get('/', (req, res) => res.send('Notes API is running!'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
