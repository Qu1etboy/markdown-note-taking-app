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
