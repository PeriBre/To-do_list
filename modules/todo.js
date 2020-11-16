const database = require("./datahandler");

class Todo{

    constructor(todo, listItems){
        this.todo = todo;
        this.listItems = listItems;
        this.valid = false;
    }

    async create(){
        try{
            let response = await database.insertTodo(this.todo,this.listItems);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Todo