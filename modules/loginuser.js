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
        let loginComplete = false;
        try{
            let response = await database.insertLogin(this.username,this.password);

            if(response != null){
                this.isValid = true;
                loginComplete = true;
            }
        }catch(error){
            console.error(error)
        }
        return loginComplete;
    }

}

module.exports = Loginuser