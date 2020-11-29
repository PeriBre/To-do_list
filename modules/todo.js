const database = require("./datahandler");

class Todo{

    constructor(todoTitle){
        this.todoTitle = todoTitle;
    }

    async createTitle(){
        try{
            let response = await database.insertTodoTitle(this.todoTitle);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Todo