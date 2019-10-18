// Copyright Maprotel. All Rights Reserved.
// Node module: proser-lb-exp 

var bodyParser = require("body-parser");
var boot = require("loopback-boot");
var loopback = require("loopback");
var path = require("path");
var handlebars = require("handlebars");
var exphbs = require("express-handlebars");
const chalk = require("chalk");
global.__basedir = __dirname;

require(`dotenv`).config();

var hbs = exphbs.create({
  defaultLayout: "",
  helpers: {},
  partialsDir: __dirname + "/../client/views",
  extname: "handlebars"
});

var app = (module.exports = loopback());

app.middleware("initial", bodyParser.urlencoded({ extended: true }));

// Bootstrap the application, configure models, datasources and middleware.

// JWT implementation
// Disable bearerTokenBase64Encoded by adding this before booting:
// app.use(
//   loopback.token({
//     model: app.models.accessToken,
//     currentUserLiteral: "me",
//     bearerTokenBase64Encoded: false // here
//   })
// );

boot(app, __dirname);

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.resolve(__dirname, 'views'));

// configure view handler
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.set('view engine', handlebars); // LoopBack comes with EJS out-of-box
app.set("json spaces", 2); // format json responses for easier viewing

// must be set to serve views properly when starting the app via `slc run` from
// the project root

app.use(loopback.static(path.resolve(__dirname, "../public")));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit("started");
    var baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      var explorerPath = app.get("loopback-component-explorer").mountPath;
      console.clear();
      console.log("");
      console.log(
        chalk.hex("#E5E510")(
          "/*********************** PROSER *************************/"
        )
      );
      console.log("System Proser by Maprotel");
      console.log("Environment: ", chalk.hex("#E5E510")(process.env.NODE_ENV));
      console.log(
        "Origin server: ",
        chalk.hex("#E5E510")(process.env.ORIGIN_DB_HOST)
      );
      console.log(
        "System DB: ",
        chalk.hex("#E5E510")(process.env.REPORTS_PROSER_DB)
      );
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
      console.log("");
      console.log(
        chalk.hex("#E5E510")(
          "/********************************************************/"
        )
      );
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
