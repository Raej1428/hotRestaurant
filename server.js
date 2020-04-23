var express = require("express");
var path = require("path");
var tablesData = require("./tables/tableArray");
var waitListData = require("./tables/waitlistArray");

var app = express();
var PORT = 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})

app.get("/api/tables", function(req, res) {
    res.json(tablesData);
  });

app.get("/api/waitlist", function(req, res) {
    res.json(waitListData);
  });

app.post("/api/tables", function(req, res) {
 
    if (tablesData.length < 5) {
      tablesData.push(req.body);
      res.json(true);
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
});

