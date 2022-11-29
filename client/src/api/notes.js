export const createNote = async (note) => {
  const res = await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return await res.json();
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

export const deleteNotes = async (userId, notes) => {
  await fetch(`http://localhost:3000/${userId}/notes/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notes: notes,
    }),
  });
};
