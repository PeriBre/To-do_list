const database = require("./datahandler");
const crypto = require("crypto");
const secret = process.env.hashSecret || require("../localenv").hashSecret;
/*
*/

class User{

    constructor(username, password/* , uppassword */){
        this.username = username;
        this.password = crypto.createHmac("sha256", secret)
            .update(password)
            .digest("hex");
        /* this.uppassword = crypto.createHmac("sha256", secret)
            .update(uppassword)
            .digest("hex"); */
        this.valid = false
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

    /* async updUserPass(){
        try{
            let response = await database.upUserPass(this.uppassword, this.username, this.password);
        }catch(error){
            console.error(error)
        }
    } */

}

module.exports = User