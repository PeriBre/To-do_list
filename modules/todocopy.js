const database = require("./datahandler");

class Todosimple{

    constructor(todo, listItems){
        this.todo = todo;
        this.listItems = listItems;
        this.valid = false;
    }

    async create(){
        try{
            let response = await database.insertTodoSimple(this.todo, this.listItems);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Todosimple