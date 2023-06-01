//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash")

const homeStartingContent = "Lacus vel facilisistie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictuuisque sagitt cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vuttonsequat semper viverra nam libero.";

const app = express();
let items = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function (req, res) {
  res.render("home", {StartingContent: homeStartingContent, posİte: items});
});

app.get("/contact" , function (req, res) {
  res.render("contact", {contactC: contactContent});
});

app.get("/about" , function (req, res) {
  res.render("about", {aboutC: aboutContent});
});

app.get("/items/:postName" , function (req, res) {
  const requestedPost = _.kebabCase(req.params.postName); // Parametreyi kebab case'e dönüştür

  items.forEach(function (post) {
    const stTitle = _.kebabCase(post.title); // Başlığı kebab case'e dönüştür
    if (stTitle === requestedPost) {
      console.log("Eşleşti");
    }
  });
});


app.get("/compose" , function (req, res) {
  res.render("compose");
});

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.mdeger,
    body: req.body.zdeger
  };
  items.push(post);
  console.log(post);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
