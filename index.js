var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

// port to serve on
port = process.env.PORT || process.argv[2] || 8000;

// serve the site
var app = express();

app.set('view engine', 'ejs');
app.use(serveStatic(path.join(__dirname, 'views')))

app.get("/", function(req, res) {
  res.render("index", {
    heroTitle: "Introducing Que",
    byline: true,
    page: "Home"
  });
});

app.get("/docs", function(req, res) {
  res.render("docs", {
    heroTitle: "Que's Documentation",
    byline: false,
    page: "Docs"
  });
});

app.listen(port, function(server) {
  console.log("Hosted on :"+port);
});
