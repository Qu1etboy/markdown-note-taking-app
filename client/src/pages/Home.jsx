import Navbar from "../components/Navbar";
import AddNoteButton from "../components/AddNoteButton";
import { useState } from "react";
import { useEffect } from "react";
import { getNote, deleteNotes } from "../api/notes";
import { Link } from "react-router-dom";
import { SlNotebook } from "react-icons/sl";
import { FaSistrix, FaTrashAlt } from "react-icons/fa";

const Home = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedNote, setSelectedNote] = useState([]);
  const [search, setSearch] = useState("");

  const handleSetNoteList = (note) => {
    setNotes([...notes, note]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setNotes(await getNote(user.uid));
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
    setNotes(notes.filter((n) => !selectedNote.includes(n)));
    setSelected(false);
    setSelectedNote([]);
  };

  useEffect(() => {
    console.log(selectedNote);
  }, [selectedNote]);

  return (
    <>
      <Navbar />
      {/* <h2 className="text-lg">
        You are sign in from {user.providerData[0].providerId}
      </h2> */}

      <div className="container">
        <div className="flex gap-5 justify-between">
          <div className="relative w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSistrix className="text-gray-400 dark:text-white" />
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search notes..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <AddNoteButton setNoteList={handleSetNoteList} />
            <button
              onClick={handleSelect}
              className="px-4 py-2 border border-slate-600 rounded-lg bg-slate-800 hover:bg-slate-900"
            >
              {selected ? "Cancel" : "Select"}
            </button>
            <button
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-800 flex items-center gap-1"
              onClick={handleDeleteNote}
            >
              <FaTrashAlt />
              Delete
            </button>
          </div>
        </div>
        <h2 className="text-3xl mt-5 text-black dark:text-white">All notes</h2>
        <div className="flex flex-wrap gap-5 mt-5">
          {notes.length > 0 ? (
            notes.map((note, index) => {
              return note.title.toLowerCase().includes(search.toLowerCase()) ||
                search === "" ? (
                <Link
                  to={`${selected ? "#" : `notes/${index + 1}`}`}
                  className={
                    "max-w-sm p-6 rounded-lg flex flex-col justify-center gap-3 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }
                  key={note.noteId}
                  state={note}
                  onClick={() => (selected ? handleSelectNote(note) : null)}
                >
                  <SlNotebook className="text-6xl text-center w-full text-gray-500 dark:text-white" />
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
              ) : null;
            })
          ) : (
            <h2 className="text-center w-full">You have no note yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
