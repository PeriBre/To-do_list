const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

const { Router } = require("express");
const secureEndpoints = require("./modules/secureEndpoint");
const user = require("./modules/user")

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.use("/secure", secureEndpoints);

server.post("/user", async function(req,res){

    const newUser = new user(req.body.username, req.body.password);

    await newUser.create();

    res.status(200).json(newUser).end();
    console.log(req.body);

});

/*server.get("/start", authenticator, (req,res,next) =>{
    
        res.send("banananana").end();

    
});*/

server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
});