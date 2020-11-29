const database = require("./datahandler");

class Todotask{

    constructor(todoTask, Title_ID_FK){
        this.todoTask = todoTask;
        this.Title_ID_FK = Title_ID_FK;
    }
    async createTask(){
        try{
            let response = await database.insertTodoTask(this.todoTask, this.Title_ID_FK);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Todotask