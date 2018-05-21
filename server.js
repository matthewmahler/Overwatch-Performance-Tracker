var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport")

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/game-api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
