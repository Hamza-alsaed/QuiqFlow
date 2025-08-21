import { Request, Response, NextFunction } from 'express';

interface Note {
  id: number;
  content: string;
}

interface NoteBody {
  content: string;
}

let notes: Note[] = [];
let idCounter = 1;

// Get all notes
export const getNotes = (_req: Request, res: Response) => {
  res.json({ success: true, data: notes });
};

// Create a new note
export const createNote = (
  req: Request<Record<string, never>, unknown, NoteBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { content } = req.body;
    if (!content) {
      const err = new Error('Content is required') as Error & { statusCode?: number };
      err.statusCode = 400;
      throw err;
    }

    const newNote: Note = { id: idCounter++, content };
    notes.push(newNote);
    res.status(201).json({ success: true, data: newNote });
  } catch (err) {
    next(err);
  }
};

// Get note by ID
export const getNoteById = (
  req: Request<{ id: string }, unknown, unknown>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const note = notes.find((n) => n.id === id);
    if (!note) {
      const err = new Error('Note not found') as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// Update a note
export const updateNote = (
  req: Request<{ id: string }, unknown, NoteBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { content } = req.body;

    const note = notes.find((n) => n.id === id);
    if (!note) {
      const err = new Error('Note not found') as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }

    if (!content) {
      const err = new Error('Content is required') as Error & { statusCode?: number };
      err.statusCode = 400;
      throw err;
    }

    note.content = content;
    res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// Delete a note
export const deleteNote = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const noteIndex = notes.findIndex((n) => n.id === id);

    if (noteIndex === -1) {
      const err = new Error('Note not found') as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }

    notes.splice(noteIndex, 1);
    res.json({ success: true, data: { message: 'Note deleted' } });
  } catch (err) {
    next(err);
  }
};
