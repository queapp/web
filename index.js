var connect = require('connect');
var serveStatic = require('serve-static');
var path = require('path');

// port to serve on
port = process.env.PORT || process.argv[2] || 8000;

// serve the site
connect()
  .use(serveStatic(path.join(__dirname, 'public')))
  .listen(port, function(server) {
    console.log("Hosted on :"+port);
  });
