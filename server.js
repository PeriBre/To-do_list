const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

const { Router } = require("express");
const secureEndpoints = require("./modules/secureEndpoint");
const user = require("./modules/user")
const todo = require("./modules/todo")

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

server.post("/todo", async function(req,res){

    const newTodo = new todo(req.body.todo, req.body.listItems);

    await newTodo.create();

    res.status(200).json(newTodo).end();
    console.log(req.body);
});

/*server.get("/start", authenticator, (req,res,next) =>{
    
        res.send("banananana").end();

    
});*/

server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
});