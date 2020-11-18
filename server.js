const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

const db = require("./modules/datahandler");

const { Router } = require("express");
const secureEndpoints = require("./modules/secureEndpoint");
const user = require("./modules/user")
const todo = require("./modules/todo")
const gettodo = require ("./modules/gettodo")
const custormersRouter = require("./modules/gettodo")

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


server.use("/todoitems", custormersRouter);

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

server.get("/gettodo", async function(req,res){
    try{
        let response = await db.getTodo();
        res.status(200).json(response).end();
        console.table(response);
    }catch(error){
        console.error(error)
    }
    
});


/*server.get("/start", authenticator, (req,res,next) =>{
    
        res.send("banananana").end();

    
});*/

server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
});