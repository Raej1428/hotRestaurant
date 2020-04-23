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

function runTableQuery() {
    
    $.ajax({ url: "/api/tables", method: "GET" })
      .then(function(tablesData) {

      
        console.log(tablesData);

        
        for (var i = 0; i < tablesData.length; i++) {

         
          var tableList = $("#tableList");

         
          var listItem = $("<li class='list-group-item mt-4'>");

          listItem.append(
            $("<h2>").text("Table #" + (i + 1)),
            $("<hr>"),
            $("<h2>").text("ID: " + tablesData[i].customerID),
            $("<h2>").text("Name: " + tablesData[i].customerName),
            $("<h2>").text("Email: " + tablesData[i].customerEmail),
            $("<h2>").text("Phone: " + tablesData[i].phoneNumber)
          );

          tableList.append(listItem);
        }
      });
  }

function runWaitListQuery() {

    $.ajax({ url: "/api/waitlist", method: "GET" })
      .then(function(waitLData) {

        console.log(waitLData);
    

        for (var i = 0; i < waitLData.length; i++) {

        
          var waitList = $("#waitList");

          var listItem = $("<li class='list-group-item mt-4'>");

          listItem.append(
            $("<h2>").text("Table #" + (i + 1)),
            $("<hr>"),
            $("<h2>").text("ID: " + waitLData[i].customerID),
            $("<h2>").text("Name: " + waitLData[i].customerName),
            $("<h2>").text("Email: " + waitLData[i].customerEmail),
            $("<h2>").text("Phone: " + waitLData[i].phoneNumber)
          );

          waitList.append(listItem);
        }
      });
 

  runTableQuery();
  runWaitListQuery();
}