const express = require("express");

const bodyParser = require("body-parser");
const server = express();
const port = (process.env.PORT || 8080);
const secureEndpoints = require("./modules/secureEndpoint");

const db = require("./modules/datahandler");

const user = require("./modules/user")
const todo = require("./modules/todo")
const deletetodo = require("./modules/deleteTodo");
const loginuser = require("./modules/loginuser");
const todotask = require("./modules/todotask");
const uptodotitle = require("./modules/updatetodo");
const uptodotask = require("./modules/updatetask");
const upuserpass = require("./modules/updateuser");

server.set("port", port);
server.use(express.static("public"));
server.use(bodyParser.json());

server.use("/secure", secureEndpoints);

server.post("/user/create", async function(req,res){

    const newUser = new user(req.body.username, req.body.password);

    await newUser.create();

    res.status(200).json(newUser).end();
    console.log(req.body);

});

server.post("/user/auth", async function(req,res){
    const newLogin = new loginuser(req.body.username, req.body.password);
    await newLogin.login();
    
    try{
        if(newLogin.isValid){
        res.status(200).json({"loginUser": newLogin}).end();
        console.log(newLogin);
        }else{res.status(403).json("Forbidden").end();
            return;
        }
    }catch(error){
        console.error(error)
    }
    
});

server.put("/updateuser", async function(req,res){
    const newUpUser = new upuserpass(req.body.uppassword, req.body.username, req.body.password);
    await newUpUser.updUsersPass();
    console.log("hallo");
    res.status(200).json(newUpUser).end();
    console.log(req.body);
});

server.delete("/user/delete", async function(req, res){
    const newDeleteUser = new user(req.body.username, req.body.password);
    await newDeleteUser.delUser();
    res.status(200).json(newDeleteUser).end();
    console.log(req.body);
});


server.post("/todo/title", async function(req,res){

    const newTodoTitle = new todo(req.body.todoTitle);

    await newTodoTitle.createTitle();

    res.status(200).json(newTodoTitle).end();
    console.log(req.body);
});

server.put("/todo/title/update", async function(req,res){
    const newUpTodoTitle = new uptodotitle(req.body.Title_Name, req.body.upTitle_Name);
    await newUpTodoTitle.updTitle();
    res.status(200).json(newUpTodoTitle).end();
    console.log(req.body);
});

server.post("/todo/task", async function(req,res){

    const newTodoTask = new todotask(req.body.todoTask, req.body.Title_ID_FK);

    await newTodoTask.createTask();

    res.status(200).json(newTodoTask).end();
    console.log(req.body);
});

server.put("/todo/task/update", async function(req,res){
    const newUpTodoTask = new uptodotask(req.body.Task, req.body.upTask, req.body.Title_ID_FK);
    await newUpTodoTask.updTask();
    res.status(200).json(newUpTodoTask).end();
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
    
    const newDeletetodo = new deletetodo(req.body.id);
    
    await newDeletetodo.delete();

    res.status(200).json(newDeletetodo).end();
    console.log(req.body);
    
});

server.listen(server.get("port"), function(){
    console.log("server running", server.get("port"));
});