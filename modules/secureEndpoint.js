const express = require("express");

let secret = express.Router();
secret.use(authenticator);

secret.get("/", (req,res,next){

})

module.exports = secret;