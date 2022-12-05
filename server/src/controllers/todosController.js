const db = require("../db/index");

module.exports = {
  createTodo: (req, res) => {
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
  },

  getTodo: (req, res) => {
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
  },

  deleteTodo: (req, res) => {
    try {
      const { userId, todoId } = req.params;
      db.query(
        "DELETE FROM todos WHERE todoId = ?",
        [todoId],
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
  },

  updateTodo: (req, res) => {
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
  },
};
