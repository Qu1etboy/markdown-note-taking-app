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

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
