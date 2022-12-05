require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors("*"));

const PORT = process.env.PORT || 3000;

const { createUser, getUser } = require("./controllers/usersController");
const notesRoute = require("./routes/notesRoute");
const todosRoute = require("./routes/todosRoute");

app.get("/users", getUser);
app.post("/users", createUser);

app.use("/notes", notesRoute);
app.use("/todos", todosRoute);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
