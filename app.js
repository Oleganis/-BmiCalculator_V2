const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");


let bmi = "";
let message = "";

app.get("/", function(req, res) {

let today = new Date();
var options = {
  weekday: "long",
  day: "numeric",
  month: "long"
}

var day = today.toLocaleDateString("en-US", options);

    res.render("index", {
BmiResult: bmi,
myMessage: message,
kindOfDay: day
  });
});

app.post("/", function(req, res) {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  bmi = (weight / (height * height)).toFixed(2);

  if (bmi <= 18) {
    message = "You are underweight!";
  } else if (bmi <= 25) {
    message = "You have normal weight!";
  } else if (bmi <= 30) {
    message = "You are overweight!";
  } else if (bmi <= 35) {
    message = "You are obese!";
  } else {
    message = "You are extreme obese!";
  }

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
