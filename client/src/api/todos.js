export const createTodo = async (userId, todo) => {
  const res = await fetch(`http://localhost:3000/${userId}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const getTodo = async (userId) => {
  const res = await fetch(`http://localhost:3000/${userId}/todos`);
  return await res.json();
};

export const updateTodo = async (userId, todo) => {
  await fetch(`http://localhost:3000/${userId}/todos/${todo.todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (userId, todo) => {
  await fetch(`http://localhost:3000/${userId}/todos/${todo.todoId}`, {
    method: "DELETE",
  });
};
