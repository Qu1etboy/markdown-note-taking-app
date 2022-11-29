import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getNoteById, updateNote } from "../api/notes";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import { GrowingSpinner } from "../components/Spinner";

const Note = () => {
  const location = useLocation();
  const note = location.state;
  // console.log(note);

  const [editable, setEditable] = useState(false);
  const [currNote, setCurrNote] = useState(null);

  // fetch note from backend
  useEffect(() => {
    const fetchData = async () => {
      setCurrNote(await getNoteById(note.userId, note.noteId));
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(currNote);
  // }, [currNote]);

  const handleEdit = (e) => {
    setCurrNote({ ...currNote, content: e.target.value });
  };

  const handleChangeTitle = (e) => {
    setCurrNote({ ...currNote, title: e.target.value });
  };

  const handleSave = () => {
    updateNote(currNote);
    setEditable(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center py-5 px-3 lg:px-0 gap-2">
      <Navbar />

      {/* <h1>This is note page you can start edit and write your note here</h1> */}
      <div className="container w-full flex items-center">
        {!editable ? (
          <button
            type="button"
            className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            onClick={() => setEditable(true)}
          >
            Edit
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
                className="container rounded-md w-full p-2 text-black dark:text-white border-gray-400 border dark:border-0"
                onChange={(e) => handleChangeTitle(e)}
              />
              <textarea
                className="container rounded-md w-full h-[72vh] p-2 text-black dark:text-white border-gray-400 border dark:border-0"
                defaultValue={currNote.content}
                onChange={(e) => handleEdit(e)}
              />
            </>
          ) : (
            <div className="container w-full mb-10">
              <h1 className="text-5xl font-bold mb-3 dark:text-white text-black">
                {currNote.title}
              </h1>
              {currNote.content === "" ? (
                <p className="mt-10">
                  This note is empty. Start by click edit button to write some
                  note.
                </p>
              ) : (
                <ReactMarkdown
                  className="prose prose-md dark:prose-invert prose-p:text-lg prose-table:text-lg prose-li:text-lg max-w-none"
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                  remarkPlugins={[remarkGfm, remarkMath]}
                >
                  {currNote.content}
                </ReactMarkdown>
              )}
            </div>
          )}
        </>
      ) : (
        // <div className="text-black dark:text-white">Loading....</div>
        <GrowingSpinner />
      )}
    </div>
  );
};

export default Note;
