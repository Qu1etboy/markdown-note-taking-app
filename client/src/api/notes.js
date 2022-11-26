import { async } from "@firebase/util";

export const createNote = async (note) => {
  await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

export const getNote = async (userId) => {
  const res = await fetch(`http://localhost:3000/${userId}/notes`);
  return await res.json();
};

export const getNoteById = async (userId, noteId) => {
  const res = await fetch(`http://localhost:3000/${userId}/notes/${noteId}`);
  return await res.json();
};

export const updateNote = async (note) => {
  await fetch(`http://localhost:3000/${note.userId}/notes/${note.noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      icon: note.icon,
      content: note.content,
    }),
  });
};
