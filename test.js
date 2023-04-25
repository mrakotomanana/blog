const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", (err, db) => {
  if (err) throw err;
  console.log("connected");
});
