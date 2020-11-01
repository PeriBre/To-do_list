const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.get("/start", function(req,res,next){

});

server.listen(app.get("port"), function(){
    console.log("server running", server.get("port"));
});