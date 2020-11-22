const pg = require("pg");
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials;

let date = new Date();

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

    async insertLogin(username, password){
        const client = new pg.Client(this.credentials);
        let loginresponse = null;
        let results = null;
        try{
            await client.connect();
            results = await client.query('SELECT username, password from public."users" where username = $1 and password = $2', [username,password]);
            if(results.rows.length > 0){loginresponse = results.rows[0]
            }else(loginresponse = null);
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
    
        return loginresponse;
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
            results = await client.query('SELECT "todo_id", "todo", "listItems" FROM todo');
            client.end();
        }catch(err){
            client.end();
            console.log(err);
            results = err;
        }
        
        return results;

    }

 /*    async updateTodo(title, description){
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

    } */

    async deleteTodo(id, todo, listItems){
        const client = new pg.Client(this.credentials);
        let results = null;
        let queryString = 'DELETE FROM todo WHERE todo."todo_id" =' + id; /*todo;+ " and todo.'listItems'=" + listItems*/
        try{
            await client.connect();
            results = await client.query(queryString);
            client.end();
            console.log(results);
        }catch(err){
            client.end();
            console.error(err);
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
