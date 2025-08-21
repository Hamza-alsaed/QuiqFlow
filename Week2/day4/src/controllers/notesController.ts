import { Request, Response, NextFunction } from 'express';

interface Note {
  id: number;
  content: string;
}

interface NoteBody {
  content: string;
}

interface HttpError extends Error {
  statusCode?: number;
}

// In-memory storage
let notes: Note[] = [];
let idCounter = 1;

// Helper to create errors with status codes
const createError = (message: string, statusCode: number): HttpError => {
  const err = new Error(message) as HttpError;
  err.statusCode = statusCode;
  return err;
};

// GET /notes
export const getNotes = (_req: Request, res: Response) => {
  res.json(notes);
};

// POST /notes
export const createNote = (
  req: Request<Record<string, never>, unknown, NoteBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    if (!content) throw createError('Content is required', 400);

    const newNote: Note = { id: idCounter++, content };
    notes.push(newNote);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

// GET /notes/:id
export const getNoteById = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw createError('Invalid ID', 400);

    const note = notes.find((n) => n.id === id);
    if (!note) throw createError('Note not found', 404);

    res.json(note);
  } catch (err) {
    next(err);
  }
};

// PUT /notes/:id
export const updateNote = (
  req: Request<{ id: string }, unknown, NoteBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw createError('Invalid ID', 400);

    const { content } = req.body;
    if (!content) throw createError('Content is required', 400);

    const note = notes.find((n) => n.id === id);
    if (!note) throw createError('Note not found', 404);

    note.content = content;
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// DELETE /notes/:id
export const deleteNote = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw createError('Invalid ID', 400);

    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) throw createError('Note not found', 404);

    notes.splice(index, 1);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
