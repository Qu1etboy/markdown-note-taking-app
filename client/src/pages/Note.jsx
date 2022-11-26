import { async } from "@firebase/util";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getNoteById, updateNote } from "../api/notes";
import Navbar from "../components/Navbar";

const Note = () => {
  const location = useLocation();
  const note = location.state;
  // console.log(note);

  const [editable, setEditable] = useState(false);
  const [currNote, setCurrNote] = useState({});

  // fetch note from backend
  useEffect(() => {
    const fetchData = async () => {
      setCurrNote(await getNoteById(note.userId, note.noteId));
    };
    fetchData();
  }, []);

  const handleEdit = (e) => {
    setCurrNote({ ...currNote, content: e.target.value });
  };
  const handleSave = () => {
    updateNote(currNote);
    setEditable(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center py-5 gap-2">
      <Navbar />

      {/* <h1>This is note page you can start edit and write your note here</h1> */}
      <div className="container w-full">
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
      </div>

      {editable ? (
        <textarea
          className="container rounded-md w-full h-[60vh] p-2"
          defaultValue={currNote.content}
          onChange={(e) => handleEdit(e)}
        />
      ) : (
        <div className="overflow-scroll w-full flex justify-center">
          <div className="container w-full h-[72vh]">
            <h1 className="text-3xl mb-3">{currNote.title}</h1>
            <p className="whitespace-pre-wrap text-lg">{currNote.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
