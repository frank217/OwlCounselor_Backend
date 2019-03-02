// Library
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Import controllers
var courseController = require("./controllers/course-controller");

// Middlewares
app.use(bodyParser.json());

app.use("/api/course", courseController);

app.get('/', (req, res) => res.send('OwlCounselor'));

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
