const database = require("./datahandler")

class User{

    constructor(username, password){
        this.username = username;
        this.password = password;
        this.valid = false
    }

    async create(){
        try{
            await database.insertUser(this.username,this.password);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = User