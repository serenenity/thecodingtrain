// import fetch from 'node-fetch';
// const express = require('express');
// // const fetch = require('node-fetch');
// // const fetch = require('node-fetch');
// const Database = require('nedb');

import fetch from 'node-fetch';
import express from 'express'; // Make sure 'express' is passed as a string

// For NeDB, there is no official ES module version, so you can use a dynamic import
// const { Database } = await import('nedb');
import Datastore from 'nedb';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.listen(3000, () => console.log("Listening at port 3000"));
// what are the essence of servers
// 1. serve web pages or host static files
// 2. take care of database and data persistency
// 3. help us with authentication     

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// const database = new Database('database.db');
const database = new Datastore({ filename: 'database.db', autoload: true });
database.loadDatabase()

// add data to the database => insert({name: "name", balance: 450})
// the geolocation API
app.post('/api', (req, res) =>{
    // console.log('I got a request');
    // // console.log(req.body);
    const data = req.body;
    const timestamp = Date.now()
    data.timestamp = timestamp;

    database.insert(data)

    res.json({
        status: 'success',
        longitude: req.body.lng,
        latitude: req.body.lat
    })
})

app.get('/api', (req, res) => {
   database.find({}, (err, data) =>{
    if(err){
        res.end()
        return
    }
    res.json(data)
   })
})

// app.get('/weather', async (req, res) =>{
//     const lat = 9.060352;
//     const lon = 7.4678272;
//     const limit = 5;
//     const apiKey = 'b3189ac4985c29fa0b4f623d33f94a19';

//     const api_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;

//     // const api_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${9.060352}&lon=${7.4678272}&limit=${5}&appid=b3189ac4985c29fa0b4f623d33f94a19`;
//     const respond = await fetch(api_URL);
//     const json_data = await fetch(respond);
//     console.log(json_data);
// })

app.get('/weather/:latlon', async (req, res) => {
    const latlon = req.params.latlon.split(',');
    const lat = latlon[0];
    const lon =  latlon[1];
    const limit = 5;
    const apiKey = process.env.OPENWEATHER_API;
    // console.log(apiKey)  

    // const api_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`;
    const api_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
   

    try {
        // Fetch the weather data from the API
        const response = await fetch(api_URL);
        
        // Parse the response as JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json_data = await response.json();
        
        // Log and send the data to the client
        console.log(json_data);
        res.json(json_data);
    } catch (error) {
        // Handle errors and send an error message to the client
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
