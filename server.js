const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

const { Router } = require("express");
const secureEndpoints = require("./modules/secureEndpoint");

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.use("/secure", secureEndpoints);

/*server.get("/start", authenticator, (req,res,next) =>{
    
        res.send("banananana").end();

    
});*/

server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
});