const database = require("./datahandler");

class Uptodotask{

    constructor(Task, upTask, Title_ID_FK){
        this.Task = Task;
        this.upTask = upTask;
        this.Title_ID_FK = Title_ID_FK;
        this.valid = false;
    }

    async updTask(){
        try{
            let response = await database.upTask(this.Task, this.upTask, this.Title_ID_FK);
        }catch(error){
            console.error(error)
        }
    }
}

module.exports = Uptodotask