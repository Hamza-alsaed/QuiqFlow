import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.js';
import translateRoutes from './routes/translateRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // replaces body-parser

// Routes
app.use('/notes', notesRoutes);
app.use('/translate', translateRoutes);

// Health check
app.get('/', (_req, res) => res.send('Notes API is running!'));

// Catch-all for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
