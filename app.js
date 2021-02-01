const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/items");
const app = express();
const mongoDB =
  "mongodb+srv://saitam:saic2357@cluster0.ntmcw.mongodb.net/item-dabase?retryWrites=true&w=majority";
app.set("view engine", "ejs");
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/get-items");
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => {
      res.render("index", { items: result });
    })
    .catch((err) => console.log(err));
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.use((req, res) => {
  res.render("error");
});
