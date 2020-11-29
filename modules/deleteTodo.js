const database = require("./datahandler");

class Deletetodo{

      constructor(id, todoTask){
        this.id = id;
        this.todoTask = todoTask;
        this.valid = false;
    }  

    async delete(){
        try{
            let response = await database.deleteTodo(this.id);
        }catch(error){
            console.error(error)
        }
    }

    async delTask(){
        try{
            let response = await database.deleteTask(this.id, this.todoTask);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Deletetodo