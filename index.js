var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var request = require("request");
var marked = require("marked");
var mime = require("mime");

// port to serve on
port = process.env.PORT || process.argv[2] || 8000;

// serve the site
var app = express();

app.set('view engine', 'ejs');
app.use(serveStatic(path.join(__dirname, 'views')))

// syntax higlighting
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

// home page
app.get("/", function(req, res) {
  res.render("index", {
    heroTitle: "Introducing Que",
    byline: true,
    page: "Home"
  });
});

// documentation
app.get("/docs/*", function(req, res) {
  // what file to get?
  filename = req.url || "/docs/index";

  if (filename.indexOf('.') === -1) {
    // normal documentation page
    filename += ".md";
    request.get("https://raw.githubusercontent.com/queapp/core/master" + filename, function(status, resp, body) {
      res.render("docs", {
        heroTitle: "",
        byline: false,
        page: "Docs",
        content: marked(body)
      });
    });
  } else {
    // a resource of some kind (image, script, ...)
    filename = filename.replace("/docs/docs/", '/docs/');
    request("https://raw.githubusercontent.com/queapp/core/master" + filename).pipe(res);
  };
});
app.get("/docs", function(req, res) { res.redirect("/docs/index") });

// start the server
app.listen(port, function(server) {
  console.log("Hosted on :"+port);
});
