const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const mongoDB = "mongodb://127.0.0.1/my_database";
const router = require("./routes/index");
const parkings = require("./parkings.json");
const { Dog } = require("./models/models");

const port = 8000;
const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");

app.set("views", "./views");

app.use("/app", router);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/parkings", (req, res) => {
  res.status(200).json(parkings);
});

app.get("/dogs", async (req, res) => {
  try {
    await mongoose.connect(mongoDB);
    const allDogs = await Dog.find();
    await mongoose.connection.close();
    res.status(200).json(allDogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.get("/dogs/:name/:breed/:age/:isGoodBoy", async function (req, res) {
  try {
    await mongoose.connect(mongoDB);
    const nameFirst = req.params.name;
    const breed = req.params.breed;
    const age = req.params.age;
    const isGoodBoy = req.params.isGoodBoy;
    const newDog = new Dog({
      name: nameFirst,
      breed: breed,
      age: age,
      isGoodBoy: isGoodBoy,
    });
    await newDog.save();
    await mongoose.connection.close();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.get("/parkings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const parking = parkings.filter((parking) => parking.id == id);
  console.log(parking);
  console.log(id);
  console.log(parking[0]["id"]);
  let str = parking[0].id;
  res.status(200).json({ id: str });
});

app.route("/login").get(function (req, res) {
  res.send("this is the login formsdf");
});

app.route("/login").post(function (req, res) {
  console.log("processing");
  res.send("processing the login form!");
});

const start = async () => {
  try {
    // await mongoose.connect(mongoDB);
    // console.log(mongoose.connections.length);
    // mongoose.createConnection(mongoDB);
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
