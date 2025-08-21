import type { Request, Response, NextFunction } from "express";

interface Note {
  id: number;
  title: string;
  content: string;
}

let notes: Note[] = [];
let idCounter = 1;

export const getNotes = (_req: Request, res: Response) => {
  res.json({ success: true, data: notes });
};

export const getNoteById = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === id);

  if (!note) {
    const err: any = new Error("Note not found");
    err.statusCode = 404;
    return next(err);
  }

  res.json({ success: true, data: note });
};

export const createNote = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

  if (!title || !content) {
    const err: any = new Error("Title and content are required");
    err.statusCode = 400;
    return next(err);
  }

  const newNote: Note = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json({ success: true, data: newNote });
};

export const updateNote = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === id);

  if (!note) {
    const err: any = new Error("Note not found");
    err.statusCode = 404;
    return next(err);
  }

  const { title, content } = req.body;
  if (!title || !content) {
    const err: any = new Error("Title and content are required");
    err.statusCode = 400;
    return next(err);
  }

  note.title = title;
  note.content = content;
  res.json({ success: true, data: note });
};

export const deleteNote = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const index = notes.findIndex(n => n.id === id);

  if (index === -1) {
    const err: any = new Error("Note not found");
    err.statusCode = 404;
    return next(err);
  }

  notes.splice(index, 1);
  res.json({ success: true, data: { message: "Note deleted" } });
};
