const database = require("./datahandler");
const crypto = require("crypto");
const secret = process.env.hashSecret || require("../localenv").hashSecret;

class Loginuser{

    constructor(username, password){
        this.username = username;
        this.password = crypto.createHmac("sha256", secret)
            .update(password)
            .digest("hex");
    }

    async login(){
        this.isValid = false;
        try{
            let response = await database.insertLogin(this.username,this.password);

            if(response != null){
                this.isValid = true;
            }
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = Loginuser