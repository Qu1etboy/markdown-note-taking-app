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

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
