import Navbar from "../components/Navbar";
import AddNoteButton from "../components/AddNoteButton";
import { useState } from "react";
import { useEffect } from "react";
import { getNote, deleteNotes } from "../api/notes";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [noteList, setNoteList] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedNote, setSelectedNote] = useState([]);

  const handleSetNoteList = (note) => {
    setNoteList([...noteList, note]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setNoteList(await getNote(user.uid));
    };
    fetchData();
  }, []);

  const handleSelectNote = (note) => {
    if (selectedNote.includes(note)) {
      setSelectedNote(selectedNote.filter((n) => n.noteId !== note.noteId));
    } else {
      setSelectedNote([...selectedNote, note]);
    }
  };

  const handleSelect = () => {
    setSelected(!selected);
    setSelectedNote([]);
  };

  const handleDeleteNote = () => {
    if (selectedNote.length == 0) {
      alert("Please select note to delete.");
      return;
    }
    // delete selected note
    // TODO: delete from database
    deleteNotes(user.uid, selectedNote);
    setNoteList(noteList.filter((n) => !selectedNote.includes(n)));
    setSelected(false);
    setSelectedNote([]);
  };

  useEffect(() => {
    console.log(selectedNote);
  }, [selectedNote]);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl">Hello, {user.displayName}</h1>
      {/* <h2 className="text-lg">
        You are sign in from {user.providerData[0].providerId}
      </h2> */}

      <div className="container">
        <div className="flex gap-5">
          <AddNoteButton setNoteList={handleSetNoteList} />
          <button
            onClick={handleSelect}
            className="px-4 py-2 border border-slate-600 rounded-lg bg-slate-800 hover:bg-slate-900"
          >
            {selected ? "Cancel" : "Select"}
          </button>
          <button
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-800"
            onClick={handleDeleteNote}
          >
            Delete
          </button>
        </div>
        <h2 className="text-3xl mt-5">All notes</h2>
        <div className="flex flex-wrap gap-5 mt-5">
          {noteList.length > 0 ? (
            noteList.map((note, index) => (
              <Link
                to={`${selected ? "#" : `notes/${index + 1}`}`}
                className={`${
                  selected && !selectedNote.includes(note)
                    ? "bg-gray-600 hover:bg-gray-800"
                    : "bg-gray-800 hover:bg-slate-700"
                } max-w-sm p-6 rounded-lg shadow-md flex flex-col justify-center gap-3`}
                key={note.noteId}
                state={note}
                onClick={() => (selected ? handleSelectNote(note) : null)}
              >
                <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  {note.title}
                </p>
                {selected && (
                  <input
                    type="checkbox"
                    className=""
                    checked={selectedNote.includes(note) ? "checked" : ""}
                  ></input>
                )}
              </Link>
            ))
          ) : (
            <h2 className="text-center w-full">You have no note yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
