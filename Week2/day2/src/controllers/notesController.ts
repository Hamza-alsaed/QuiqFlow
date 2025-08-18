import type { Request, Response } from "express";

interface Note {
  id: number;
  title: string;
  content: string;
}

let notes: Note[] = [];
let idCounter = 1;

export const getNotes = (req: Request, res: Response) => {
  res.json(notes);
};

export const getNoteById = (req: Request, res: Response) => {
  const note = notes.find(n => n.id === parseInt(req.params.id ?? ""));
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
};

export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body;
  const newNote: Note = { id: idCounter++, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
};

export const updateNote = (req: Request, res: Response) => {
  const note = notes.find(n => n.id === parseInt(req.params.id ?? ""));
  if (!note) return res.status(404).json({ message: "Note not found" });
  const { title, content } = req.body;
  note.title = title ?? note.title;
  note.content = content ?? note.content;
  res.json(note);
};

export const deleteNote = (req: Request, res: Response) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id ?? ""));
  if (index === -1) return res.status(404).json({ message: "Note not found" });
  notes.splice(index, 1);
  res.json({ message: "Note deleted" });
};
