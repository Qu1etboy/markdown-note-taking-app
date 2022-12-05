import { API_URL } from "./config";

export const createTodo = async (userId, todo) => {
  const res = await fetch(`${API_URL}/todos/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const getTodo = async (userId) => {
  const res = await fetch(`${API_URL}/todos/${userId}`);
  return await res.json();
};

export const updateTodo = async (userId, todo) => {
  await fetch(`${API_URL}/todos/${userId}/${todo.todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (userId, todo) => {
  await fetch(`${API_URL}/todos/${userId}/${todo.todoId}`, {
    method: "DELETE",
  });
};
