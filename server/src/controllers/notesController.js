const db = require("../db/index");

module.exports = {
  createNote: (req, res) => {
    try {
      const { userId, title, icon, content } = req.body;

      db.query(
        "INSERT INTO notes (userId, title, icon, content) VALUES (?, ?, ?, ?)",
        [userId, title, icon, content],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          const noteId = result.insertId;
          db.query(
            "SELECT * FROM notes WHERE noteId = ?",
            [noteId],
            (err, result) => {
              if (err) {
                return res.status(400).send();
              }
              res.json(result[0]);
            }
          );
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  getAllNote: (req, res) => {
    try {
      const userId = req.params.userId;

      db.query(
        "SELECT * FROM notes WHERE userId = ?",
        [userId],
        (err, result) => {
          if (err) {
            return res.status(400).send();
          }
          res.json(result);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  getNoteById: (req, res) => {
    try {
      const { userId, noteId } = req.params;

      db.query(
        "SELECT * FROM notes WHERE noteId = ?",
        [noteId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.json(result[0]);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  updateNote: (req, res) => {
    try {
      const { title, icon, content } = req.body;
      const { userId, noteId } = req.params;

      db.query(
        "UPDATE notes SET title = ?, icon = ?, content = ? WHERE noteId = ?",
        [title, icon, content, noteId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.json(result);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },

  deleteNote: (req, res) => {
    try {
      // list of note to delete
      const { notes } = req.body;

      const notesId = notes.map((note) => note.noteId);

      db.query(
        "DELETE FROM notes WHERE noteId IN (?)",
        [notesId],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.json(result);
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  },
};
