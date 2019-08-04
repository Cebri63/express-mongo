const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/counter", { useNewUrlParser: true });

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const port = 3000;

// notre mini base de données
let counter = 0;

const Counter = mongoose.model("Counter", {
  name: "",
  quantity: 0,
  email: "",
  dateOfBirth: "",
  adress: ""
});

app.get("/", (req, res) => {
  res.json("Valeur du compteur est " + counter + " !!!");
});

app.post("/create", async (req, res) => {
  try {
    const newCounter = new Counter({
      name: req.body.name,
      quantity: req.body.quantity
    });
    await newCounter.save();
    res.json(newCounter);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// app.get("/increment", (req, res) => {
//   counter++;
//   res.send("Là on incrémente !");
// });

app.post("/increment", async (req, res) => {
  const counterFound = await Counter.findById(req.body.id);
  counterFound.quantity = counterFound.quantity + req.body.quantity;
  counterFound.save();
  res.json(counterFound);
});

// app.get("/decrement", (req, res) => {
//   counter--;
//   res.send("Là on décrémente !");
// });

app.post("/decrement", async (req, res) => {
  const counterFound = await Counter.findById(req.body.id);
  counterFound.quantity = counterFound.quantity - req.body.quantity;
  counterFound.save();
  res.json(counterFound);
});

app.listen(port, () => {
  console.log("Server has started !");
});
