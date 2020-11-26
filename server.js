const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);

const db = require("./modules/datahandler");

//const { Router, response } = require("express");
const secureEndpoints = require("./modules/secureEndpoint");
const user = require("./modules/user")
const todo = require("./modules/todo")
const deletetodo = require("./modules/deleteTodo");
const loginuser = require("./modules/loginuser");
const todosimple = require("./modules/todocopy");
const todotask = require("./modules/todo copy");
const custormersRouter = require("./modules/gettodo");
const { copy } = require("./modules/secureEndpoint");
//const { json } = require("body-parser");

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.use("/todoitems", custormersRouter);

server.use("/secure", secureEndpoints);

server.post("/user", async function(req,res){

    const newUser = new user(req.body.username, req.body.password);

    await newUser.create();

    res.status(200).json(newUser).end();
    console.log(req.body);

});

server.post("/user/auth", async function(req,res){
    const newLogin = new loginuser(req.body.username, req.body.password);
    await newLogin.login();
    
    try{
        if(newLogin.isValid){res.status(200).json({"loginUser": newLogin}).end();
        console.log(newLogin);
        }else{res.status(403).json("Forbidden").end();
            return}
    }catch(error){
        console.error(error)
    }
    
});

server.delete("/user/delete", async function(req, res){
    const newDeleteUser = new user(req.body.username, req.body.password);
    await newDeleteUser.delUser();
    res.status(200).json(newDeleteUser).end();
    console.log(req.body);
})

server.post("/todo", async function(req,res){

    const newTodo = new todosimple(req.body.todo, req.body.listItems);

    await newTodo.create();

    res.status(200).json(newTodo).end();
    console.log(req.body);
});

server.post("/todo/title", async function(req,res){

    const newTodoTitle = new todo(req.body.todoTitle);

    await newTodoTitle.createTitle();

    res.status(200).json(newTodoTitle).end();
    console.log(req.body);
});

server.post("/todo/task", async function(req,res){

    const newTodoTask = new todotask(req.body.todoTask, req.body.Title_ID_FK);

    await newTodoTask.createTask();

    res.status(200).json(newTodoTask).end();
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

server.get("/gettodoTitle", async function(req,res){
    try{
        let response = await db.getTodoTitle();
        res.status(200).json(response).end();
        console.table(response.rows);
    }catch(error){
        console.error(error)
    }
    
});

server.delete("/deletetask", async function(req, res){

    const newDeleteTask = new deletetodo(req.body.id, req.body.todoTask);
    await newDeleteTask.delTask();
    res.status(200).json(newDeleteTask).end();
    console.log(req.body);
});


server.delete("/del", async function(req, res){
    
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
