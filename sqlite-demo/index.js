// FROM NODE 22. SOMETHING UPWARD
// import { DatabaseSync } from 'node:sqlite';
// const db = new DatabaseSync('contacts.db');

import sqlite3 from "sqlite3";
import { execute , fetchAll } from "./sql.js";


const main = async () => {
    const db = new sqlite3.Database("my.db");
    try{

        await execute(
            db,
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL
            )`
        );
    } catch (error){
        console.error(error)
    } 


    // INSERTING INTO THE TABLE

    const sql =  `INSERT INTO products(name, price) VALUES (?,?)`;
    // `UPDATE products SET price = ? WHERE id = ?`
    
    // `INSERT INTO products(name, price) VALUES (?,?)`;
    try{
        await execute(
            db,
            sql,
            ["Google Pixel 7", 599]
        );

    } catch (error){
        console.error(error);
    }

    let query = `SELECT * FROM products`

    try{
        const products = await fetchAll(db, query);
        console.log(products)
    }catch (error){
        console.error(error);
    } finally{
        db.close();
    }

    // const sql = `UPDATE products SET price = ? WHERE id = ?`;
    // try {
    //     await execute(db, sql, [1000.99, 1]);
    // } catch (err) {
    //     console.log(err);
    // } finally {
    //     db.close();
    // }
    // };
}


main();
// const db = new sqlite3.Database('contact.db');
// THE Database('contact.db') METHOD CAN TAKE ANY OF THESE 3 MODE AS THE SECOND ARG => 
    // 1. sqlite3.OPEN_READONLY
    // 2. sqlite3.OPEN_READWRITE
    // 3. sqlite3.OPEN_CREATE
    // EG => const db = new sqlite3.Database("chinook.db", sqlite3.OPEN_READWRITE);

// db.exec(`
//     create table if not exists contacts (
//          id integer primary key, 
//          firstName text not null, 
//          lastName text not null, 
//          email text not null    
//     )`);


// const stmt = db.prepare(
//     `INSERT INTO contacts (firstName, lastName, email) 
//         VALUES (?, ?, ?)`
//     );

//     const { lastInsertRowid } = stmt.run('Jane', 'Doe', 'jane.doe@example.com');

//     console.log(`Inserted contact id: ${lastInsertRowid}`);

// if(db) db.close;

