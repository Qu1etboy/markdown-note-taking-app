import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { createNote } from "../api/notes";
import { FaPlus } from "react-icons/fa";

const AddNoteButton = ({ setNoteList }) => {
  const { user } = useAuthContext();
  const [isOpen, setOpen] = useState(false);
  const [note, setNote] = useState({
    userId: "",
    title: "",
    content: "",
    icon: "",
  });

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (note.title.trim() === "") {
      return;
    }

    setOpen(false);
    const data = await createNote(note);
    setNoteList(data);
  };

  const handleSetNote = (e) => {
    setNote({ ...note, userId: user.uid, title: e.target.value });
  };

  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-2"
        type="button"
        data-modal-toggle="defaultModal"
        onClick={() => setOpen(true)}
      >
        <FaPlus />
        Note
      </button>
      {isOpen && (
        <>
          <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed z-50 p-4 w-full inset-0 h-full"
            onClick={() => setOpen(false)}
          >
            {/* modal */}
            <form
              className="mx-auto translate-y-1/2 left-0 right-0 max-w-2xl rounded-lg shadow dark:bg-gray-700 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* body */}
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create your new note
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col gap-2" action="">
                  <label>Note's name</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    onChange={(e) => handleSetNote(e)}
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleAddNote}
                >
                  Create
                </button>
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div
            className="opacity-30 fixed inset-0 bg-black"
            onClick={() => console.log("you click outside the modal")}
          ></div>
        </>
      )}
    </>
  );
};

export default AddNoteButton;
