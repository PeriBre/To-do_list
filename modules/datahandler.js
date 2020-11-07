const pg = require("pg");
//const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;

class StorageHandler {
    constructor(credentials){
        this.credentials = {
            connectionString: credentials,
            ssl:{
                rejectUnauthorized: false
            }
        };
    }

    /*async insert(table,...params){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('SELECT message from "Secrets" where id=$1', [secretId]);
            results = results.row[0].message;
            client.end();
        }catch(err){
            client.end();
            results = err;
        }
    
        return results;
    }*/
}




module.exports = /*new*/ StorageHandler/*(dbCredentials)*/