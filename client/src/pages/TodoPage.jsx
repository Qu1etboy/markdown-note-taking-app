import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../api/todos";
import { useEffect } from "react";
import { GrowingSpinner } from "../components/Spinner";

const TodoPage = () => {
  const { user } = useAuthContext();
  const [todos, setTodos] = useState(null);
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
      <h2 className="text-xl mx-auto mb-3 text-black dark:text-white">
        What to do today?
      </h2>
      <form className="flex justify-center gap-2 w-full mx-auto mb-5">
        <input
          className="p-2 rounded-md max-w-[500px] w-full border-gray-300 border text-black dark:text-white"
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
      <h2 className="text-3xl mb-3">All Todos</h2>
      {todos !== null ? (
        <>
          {todos?.map((todo, index) => (
            <div
              key={todo.todoId}
              className={`${
                todo.todoStatus === "NOT_DONE"
                  ? "border-neutral-400 dark:border-white"
                  : "border-green-600 dark:border-green-400"
              } flex justify-between items-center gap-2 rounded-md border px-3 py-4 mt-5`}
            >
              <div>
                <p
                  className={`${
                    todo.todoStatus === "NOT_DONE"
                      ? "text-black dark:text-white"
                      : "text-green-600 dark:text-green-400"
                  } text-md`}
                >
                  {todo.todo}
                </p>
                <p
                  className={`${
                    todo.todoStatus === "NOT_DONE"
                      ? "text-black dark:text-white"
                      : "text-green-600 dark:text-green-400"
                  } text-sm`}
                >
                  {todo.createdAt.toString()}
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  onClick={() => handleDoneTodo(todo)}
                  type="checkbox"
                  defaultChecked={todo.todoStatus === "NOT_DONE" ? "" : "true"}
                  className="w-5 checked:accent-green-500 cursor-pointer"
                  title="mark as done"
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
        </>
      ) : (
        <GrowingSpinner />
      )}
    </div>
  );
};

export default TodoPage;
