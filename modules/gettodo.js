const database = require("./datahandler");

let Gettodo = async function getTD(){
        try{
            let response = await database.getTodo(/*'SELECT todo."todo", todo."listItems" FROM todo'*/);
            console.table(response)
        }catch(error){
            console.error(error)
        }
};

module.exports = Gettodo