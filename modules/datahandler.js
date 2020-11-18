const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;

let date = new Date();

const db = dbCredentials

class StorageHandler {
    constructor(credentials){
        this.credentials = {
            connectionString: credentials,
            ssl:{
                rejectUnauthorized: false
            }
        };
    }

    async insertUser(username, password){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('INSERT INTO "public"."users"("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
    
        return results;
    }

    async insertTodo(todo, listItems){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('INSERT INTO "public"."todo"("todo", "complete", "date_complete", "listItems") VALUES($1, $2, $3, $4) RETURNING *;', [todo, 0, date, listItems]);
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
    
        return results;
    }

    async getTodo(){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('SELECT "todo", "listItems" FROM todo');
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
        
        return results;

    }

    async updateTodo(title, description){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query(`UPDATE todo SET title = $1, description = $2 WHERE id = $3`)[title, description, req.params.id];
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
        
        return results;

    }

    async deleteTodo(){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query(`DELETE FROM todo WHERE id = $1`)[req.params.id];
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
        
        return results;
    }
    /*async insert(...params){
        const client = new pg.Client(this.credentials);
        let results = null;
        try{
            await client.connect();
            results = await client.query('INSERT INTO "public"."$1"("username", "password") VALUES("$2", "$3") RETURNING *;', params);
            results = results.row[0].message;
            client.end();
        }catch(err){
            client.end();
            results = err;
        }
    
        return results;
    }*/
}




module.exports = new StorageHandler(dbCredentials);
