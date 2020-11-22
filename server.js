const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

const db = require("./modules/datahandler");

const { Router, response } = require("express");
const secureEndpoints = require("./modules/secureEndpoint");
const user = require("./modules/user")
const todo = require("./modules/todo")
const deletetodo = require("./modules/deleteTodo");
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
        console.table(response.rows);
    }catch(error){
        console.error(error)
    }
    
});

server.post("/del", async function(req, res){
    
    /* try{
        let response = await db.deleteTodo(this.id);
    }catch(error){
        console.error(error)
    } */
    
    const newDeletetodo = new deletetodo(req.body.id);
    
    await newDeletetodo.delete();

    res.status(200).json(newDeletetodo).end();
    console.log(req.body);
    
    /* const newDeletetodo = new deletetodo(req.body.todo, req.body.listItems);
    
    await newDeletetodo.delete();

    res.status(200).json(newDeletetodo).end();
    console.log(req.body); */


    /* try{
        let response = await db.deleteTodo();
        res.status(200).json(response).end();
        console.log(response);
    }catch(error){
        console.error(error);   
    } */

    /* try{db.deleteTodo();
        console.log("deletet");
    }catch(error){
        console.log(error)
    }  */
});


/*server.get("/start", authenticator, (req,res,next) =>{
    
        res.send("banananana").end();

    
});*/

server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
});
