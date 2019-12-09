//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");



const homeContent = "I came to life on a cold winter day of December 25 in a small city in Romania. I grew up playing soccer and basketball with the boys and at some point, after proving my skills, ended up being their leader. Steps forward, I have to decide what career I want to pursue in my adult life.";
const aboutContent = " I started with HTML, then CSS and Bootstrap, then JavaScript; here I had to spend more time to understand better the variables, the functions, if statements, loops, DOM manipulation, jQuery library and Lodash; how they connect and work together";
const knowledgeContent = "I’ll start with the last project I’m working on, which is a Blog created with EJS partials. I have dynamically single pages, new web pages for each blog post created. On the Home page, I will have all the blog posts, listed in chronological order, but the actual blog content will be truncated to only a hundred characters.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];


app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});
app.get("/knowledge", function(req, res) {
  res.render("knowledge", {
    knowledgeContent: knowledgeContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.newTitle,
    content: req.body.newText,
    posts: posts
  };
  posts.push(post);
  res.redirect('/');
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
