const database = require("./datahandler");

class Uptodotitle{

    constructor(Title_Name, upTitle_Name){
        this.Title_Name = Title_Name;
        this.upTitle_Name = upTitle_Name;
        this.valid = false;
    }

    async updTitle(){
        try{
            let response = await database.upTitle(this.Title_Name, this.upTitle_Name);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = Uptodotitle