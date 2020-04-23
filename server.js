var express = require("express");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})