import Navbar from "../components/Navbar";
import AddNoteButton from "../components/AddNoteButton";
import { useState } from "react";
import { useEffect } from "react";
import { getNote } from "../api/notes";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [noteList, setNoteList] = useState([]);

  const handleSetNoteList = (note) => {
    setNoteList([...noteList, note]);
  };

  useEffect(() => {
    const fetchData = async () => {
      setNoteList(await getNote(user.uid));
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl">Hello, {user.displayName}</h1>
      {/* <h2 className="text-lg">
        You are sign in from {user.providerData[0].providerId}
      </h2> */}

      <div className="container">
        <AddNoteButton setNoteList={handleSetNoteList} />
        <h2 className="text-3xl mt-5">All notes</h2>
        <div className="flex flex-wrap gap-5 mt-5">
          {noteList.length > 0 ? (
            noteList.map((note, index) => (
              <Link
                to={`notes/${index + 1}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={note.noteId}
                state={note}
              >
                <p className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                  {note.title}
                </p>
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
