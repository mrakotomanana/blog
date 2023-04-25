const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/animals";

let db = MongoClient.connect(url, function (err, db) {
  console.log("Connected successfully to server");
});

console.log(db.user);