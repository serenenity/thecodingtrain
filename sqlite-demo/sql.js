export const execute = async (db, sql, params = []) =>{

    // Updating Data wrapper function
    // Inserting Data wrapper function
    // Deleting Data wrapper function
    if(params && params.length > 0) {
        return new Promise ((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err);
                resolve();
            })
        })
    }

    // Create Wrapper Functions
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if(err) reject(err);
            resolve();
        })
    })
}

export const fetchAll = async (db, sql, params) =>{
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
} 

export const fetchFirst = async (db, sql, params) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
}  ;

// we already created our index file before trying to INSERT into the db using this style of programming.
// INSERT onject => db.run(sql, params, callback);
// Update and Delete are similar in execution using the db.run and only changing the sql Statement
// Querying data from a table
// => db.all(sql, params, callback);
// => db.get(sql, params, callback);