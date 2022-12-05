import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNoteById, updateNote } from "../api/notes";
import { GrowingSpinner } from "../components/Spinner";
import NoteContent from "../components/NoteContent";
import Layout from "../components/Layout";
import Editor from "@monaco-editor/react";
import { FaPen, FaArrowLeft } from "react-icons/fa";

const Note = () => {
  const location = useLocation();
  const note = location.state;

  const [editable, setEditable] = useState(false);
  const [currNote, setCurrNote] = useState(null);

  // fetch note from backend
  useEffect(() => {
    // TODO: get noteId from url param
    const fetchData = async () => {
      setCurrNote(await getNoteById(note.userId, note.noteId));
    };
    fetchData();
  }, []);

  const handleEdit = (e) => {
    setCurrNote({ ...currNote, content: e });
  };

  const handleChangeTitle = (e) => {
    setCurrNote({ ...currNote, title: e.target.value });
  };

  const handleSave = () => {
    updateNote(currNote);
    setEditable(false);
  };

  return (
    <Layout title={note.title}>
      {/* <h1>This is note page you can start edit and write your note here</h1> */}
      <div className="p-5 overflow-scroll w-full h-screen">
        <div className="container w-full flex gap-1 items-center mb-5">
          <Link
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            to="/"
            title="Back"
          >
            <FaArrowLeft />
          </Link>

          {!editable ? (
            <button
              type="button"
              className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
              onClick={() => setEditable(true)}
              title="Edit"
            >
              <FaPen />
            </button>
          ) : (
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          <p className="text-black dark:text-white">
            Edited {currNote?.updatedAt?.replace("T", " ").slice(0, 16)}
          </p>
        </div>

        {currNote !== null ? (
          <>
            {editable ? (
              <>
                <input
                  placeholder="title"
                  defaultValue={currNote.title}
                  className="container rounded-md w-full mb-2 p-2 text-black dark:text-white border-gray-400 border dark:border-0"
                  onChange={(e) => handleChangeTitle(e)}
                />
                <Editor
                  height="75vh"
                  defaultLanguage="markdown"
                  defaultValue={currNote.content}
                  theme={
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "vs-dark"
                      : "light"
                  }
                  onChange={(e) => handleEdit(e)}
                  options={{ fontSize: 14 }}
                />
              </>
            ) : (
              <NoteContent note={currNote} />
            )}
          </>
        ) : (
          // <div className="text-black dark:text-white">Loading....</div>
          <GrowingSpinner />
        )}
      </div>
    </Layout>
  );
};

export default Note;
