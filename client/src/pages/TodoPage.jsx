import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../api/todos";
import { useEffect } from "react";

const TodoPage = () => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const useFetch = async () => {
      setTodos(await getTodo(user.uid));
    };
    useFetch();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("Please insert something first.");
      return;
    }

    const t = await createTodo(user.uid, {
      userId: user.uid,
      todo: todo,
      todoStatus: "NOT_DONE",
    });
    console.log(t);
    setTodos([...todos, t]);
    setTodo("");
  };
  const handleDeleteTodo = (todo) => {
    deleteTodo(user.uid, todo);
    setTodos(todos.filter((t) => t.todoId !== todo.todoId));
  };

  const handleDoneTodo = (todo) => {
    updateTodo(user.uid, {
      ...todo,
      todoStatus: todo.todoStatus === "NOT_DONE" ? "DONE" : "NOT_DONE",
    });
    setTodos(
      todos.map((t) =>
        t.todoId === todo.todoId
          ? {
              ...todo,
              todoStatus: todo.todoStatus === "NOT_DONE" ? "DONE" : "NOT_DONE",
            }
          : t
      )
    );
  };

  const handleSetTodo = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="w-full p-5 flex flex-col h-screen overflow-scroll">
      <h1 className="text-3xl font-bold">Todo page</h1>
      <h2 className="text-xl mx-auto mb-3">What to do today?</h2>
      <form className="flex justify-center gap-2 w-full mx-auto">
        <input
          className="p-2 rounded-md max-w-[500px] w-full"
          placeholder="my todo..."
          onChange={(e) => handleSetTodo(e)}
          value={todo}
          onKeyDown={(e) => (e.key === "Enter" ? handleAddTodo(e) : null)}
        />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2"
          onClick={(e) => handleAddTodo(e)}
        >
          Add
        </button>
      </form>

      {todos.map((todo, index) => (
        <div
          key={todo.todoId}
          className={`${
            todo.todoStatus === "NOT_DONE" ? "border-white" : "border-green-400"
          } flex justify-between items-center gap-2 rounded-md border px-3 py-4 mt-5`}
        >
          <div>
            <p>{todo.todo}</p>
            <p>{todo.createdAt.toString()}</p>
          </div>
          <div className="flex gap-3">
            <input
              onClick={() => handleDoneTodo(todo)}
              type="checkbox"
              defaultChecked={todo.todoStatus === "NOT_DONE" ? "" : "true"}
              className="w-5 checked:accent-green-500 cursor-pointer"
            />
            <button
              onClick={() => handleDeleteTodo(todo)}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-800 flex items-center gap-1"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoPage;
