const database = require("./datahandler");

class Deletetodo{

      constructor(id){
        this.id = id;
        this.valid = false;
    }  

   /* constructor(todo, listItems){
        this.todo = todo;
        this.listItems = listItems;
        this.valid = false;
    }*/

    async delete(){
        try{
            let response = await database.deleteTodo(this.id/*, this.listItems*/);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Deletetodo