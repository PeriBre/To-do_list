const database = require("./datahandler");

class Updatetodo{

    constructor(Title_Name, upTitle_Name){
        this.Title_Name = Title_Name;
        this.upTitle_Name = upTitle_Name;
    }

    async updTitle(){
        try{
            let response = await database.upTitle(this.Title_Name, this.upTitle_Name);
        }catch(error){
            console.error(error)
        }
    }


}

module.exports = Updatetodo