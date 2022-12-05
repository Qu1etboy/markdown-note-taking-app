import { API_URL } from "./config";

export const createNote = async (note) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return await res.json();
};

export const getNote = async (userId) => {
  const res = await fetch(`${API_URL}/notes/${userId}`);
  return await res.json();
};

export const getNoteById = async (userId, noteId) => {
  const res = await fetch(`${API_URL}/notes/${userId}/${noteId}`);
  return await res.json();
};

export const updateNote = async (note) => {
  await fetch(`${API_URL}/notes/${note.userId}/${note.noteId}`, {
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

export const deleteNotes = async (userId, notes) => {
  await fetch(`${API_URL}/notes/${userId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notes: notes,
    }),
  });
};
