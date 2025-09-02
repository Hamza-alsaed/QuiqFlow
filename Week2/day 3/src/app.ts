import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import notesRoutes from './routes/notes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes);

// Health check
app.get('/', (_req, res) => res.send('Notes API is running!'));

// Global error handler 
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
