const express = require("express");
const router = express.Router();
var sqlite3 = require("sqlite3");


router.use(function (req, res, next) {
  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});

router.get("/", function (req, res) {
  console.log(res.body);
  res.render("app/index", { title: "Express" });
});

router.get("/lastName/:name", function (req, res) {
  console.log(res.body);
  var db = new sqlite3.Database("mydb.db");

  db.serialize(function () {
    // Create a table
    db.run(
      "CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, name TEXT, lastname TEXT)"
    );

    // Insert data into the table
    // db.run("INSERT INTO Foo (name, lastname) VALUES ('" + req.body.firstName + "', '" + req.body.firstName + "')");

    // Query data from the table
    db.each("SELECT id, name, lastname FROM Foo", function (err, row) {
      console.log(row.id + " : " + row.name + " - " + row.lastname);
    });
  });

  db.close();
  res.render("app/index", { title: "Express" });
});

router.get("/create", function (req, res) {
  res.render("app/create", { title: "Create Recorder" });
});

router.post("/create", function (req, res) {
  console.log(req.body);
  // res.render('create', { title: 'Create Recorder', data : req.body});

  var db = new sqlite3.Database("mydb.db");

  db.serialize(function () {
    // Create a table
    db.run(
      "CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, name TEXT, lastname TEXT)"
    );

    // Insert data into the table
    db.run("INSERT INTO Foo (name, lastname) VALUES ('" + req.body.firstName + "', '" + req.body.lastName + "')");

    // Query data from the table
    // db.each("SELECT id, name FROM Foo", function (err, row) {
    //   console.log(row.id + ": " + row.name);
    // });
  });

  db.close();

  res.redirect(303, '/app/lastName/' + req.body.lastName);

//   res.render("index", { title: "Express" });
});

module.exports = router;
