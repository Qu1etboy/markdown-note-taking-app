const db = require("../db/index");

module.exports = {
  createUser: (req, res) => {
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
  },

  getUser: (req, res) => {
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
  },
};
