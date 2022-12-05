const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors("*"));

const PORT = 3000;

const db = require("./db/index");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/users", (req, res) => {
  try {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        return res.status(400).send();
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/users", (req, res) => {
  try {
    const { userId, displayName, email, photoURL, providerId } = req.body;

    db.query(
      "INSERT IGNORE INTO users VALUES (?, ?, ?, ?, ?)",
      [userId, displayName, email, photoURL, providerId],
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
});

app.post("/notes", (req, res) => {
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
});

app.get("/:userId/notes", (req, res) => {
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
});

app.patch("/:userId/notes/:noteId", (req, res) => {
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
});

app.get("/:userId/notes/:noteId", (req, res) => {
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
});

app.delete("/:userId/notes/delete", (req, res) => {
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
});

app.get("/:userId/todos", (req, res) => {
  try {
    const { userId } = req.params;
    db.query(
      "SELECT * FROM todos WHERE userId = ?",
      [userId],
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
    res.status(500).send(err);
  }
});

app.post("/:userId/todos", (req, res) => {
  try {
    const { userId } = req.params;
    const { todoId, todo, todoStatus } = req.body;
    db.query(
      "INSERT INTO todos (todo, todoStatus, userId) VALUES (?, ?, ?)",
      [todo, todoStatus, userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }

        const todoId = result.insertId;

        db.query(
          "SELECT * FROM todos WHERE todoId = ?",
          [todoId],
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
    res.status(500).send(err);
  }
});

app.delete("/:userId/todos/:todoId", (req, res) => {
  try {
    const { userId, todoId } = req.params;
    db.query("DELETE FROM todos WHERE todoId = ?", [todoId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.patch("/:userId/todos/:todoId", (req, res) => {
  try {
    const { todo, todoStatus, finishAt } = req.body;
    const { userId, todoId } = req.params;

    db.query(
      "UPDATE todos SET todo = ?, todoStatus = ?, finishAt = ? WHERE todoId = ?",
      [todo, todoStatus, finishAt, todoId],
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
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
