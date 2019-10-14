// Dependencies
var express = require("express");
var path = require("path");

var PORT = process.env.PORT || 8080;

var app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// The below code effectively "starts" our server

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});