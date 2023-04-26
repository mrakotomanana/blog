const express = require("express");

const path = require("path");
const index = require("./routes/index");
const todo = require("./routes/todo");
const config =  require('./config.js');

const port = config.PORT;
const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use("/app", index);
app.use("/todo", todo);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Listening on http://${config.HOST}:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
