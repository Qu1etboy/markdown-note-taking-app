import { useState } from "react";
import { useLocation } from "react-router-dom";
import { updateNote } from "../api/notes";
import Navbar from "../components/Navbar";

const Note = () => {
  const location = useLocation();
  const note = location.state;
  // console.log(note);

  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    updateNote({ ...note, content: content });
    setEditable(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center p-5 gap-2">
      <Navbar />
      <h1>{note.title}</h1>
      <h1>This is note page you can start edit and write your note here</h1>
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
      {editable ? (
        <textarea
          className="container rounded-md w-full h-[60vh] p-2"
          onChange={(e) => setContent(e.target.value)}
        >
          {content}
        </textarea>
      ) : (
        <div className="container w-full">
          <p className="whitespace-pre-wrap text-lg">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Note;
