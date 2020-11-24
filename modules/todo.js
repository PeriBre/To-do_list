const database = require("./datahandler");

class Todo{

    constructor(todoTitle, todoTask, Title_ID_FK){
        this.todoTitle = todoTitle;
        this.todoTask = todoTask;
        this.Title_ID_FK = Title_ID_FK;
        this.valid = false;
    }

    async createTitle(){
        try{
            let response = await database.insertTodoTitle(this.todoTitle);
        }catch(error){
            console.error(error)
        }
    }
    async createTask(){
        try{
            let response = await database.insertTodoTask(this.todoTask, this.Title_ID_FK);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Todo