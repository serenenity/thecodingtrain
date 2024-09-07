const express = require('express');
const Database = require('nedb');

const app = express();

app.listen(3000, () => console.log("Listening at port 3000"));
// what are the essence of servers
// 1. serve web pages or host static files
// 2. take care of database and data persistency
// 3. help us with authentication     

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Database('database.db');
database.loadDatabase()

// add data to the database => insert({name: "name", balance: 450})
// the geolocation API
app.post('/api', (req, res) =>{
    console.log('I got a request');
    // console.log(req.body);
    database.insert({latitude: req.body.lat, longitude: req.body.lng })

    res.json({
        status: 'success',
        longitude: req.body.lng,
        latitude: req.body.lat
    })
})