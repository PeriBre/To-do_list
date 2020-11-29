const database = require("./datahandler");
const crypto = require("crypto");
const { response } = require("express");
const secret = process.env.hashSecret || require("../localenv").hashSecret;

class Upuserpass{

    constructor(username, password, uppassword){
        this.username = username;
        this.password = crypto.createHmac("sha256", secret)
            .update(password)
            .digest("hex");
        this.uppassword = crypto.createHmac("sha256", secret)
            .update(uppassword)
            .digest("hex");
    }


    async updUsersPass(){
        try{
            let response = await database.upUserPass(this.uppassword, this.upusername, this.username);
            console.log(response);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = Upuserpass