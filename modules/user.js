const database = require("./datahandler");
const crypto = require("crypto");
const secret = process.env.hashSecret || require("../localenv").hashSecret;
/*
*/

class User{

    constructor(username, password){
        this.username = username;
        this.password = crypto.createHmac("sha256", secret)
            .update(password)
            .digest("hex");
    }

    async create(){
        try{
            let response = await database.insertUser(this.username,this.password);
        }catch(error){
            console.error(error)
        }
    }

    async delUser(){
        try{
            let response = await database.deleteUser(this.username,this.password);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = User