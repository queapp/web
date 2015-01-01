var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var request = require("request");
var marked = require("marked");

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

app.get("/docs/:page", function(req, res) {
  // get the documentation
  filename = req.param('path') || "index";
  request.get("https://raw.githubusercontent.com/queapp/core/master/docs/" + filename + ".md", function(status, resp, body) {
    res.render("docs", {
      heroTitle: "Que's Documentation",
      byline: false,
      page: "Docs",
      content: marked(body)
    });
  });
});
app.get("/docs", function(req, res) { res.redirect("/docs/index") });

app.listen(port, function(server) {
  console.log("Hosted on :"+port);
});
