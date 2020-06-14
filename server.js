const express = require('express');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config()
const { Client } = require('pg')

const app = express();
const mustache = mustacheExpress();
mustache.cache = null;

app.engine('mustache', mustache);
app.set('view engine', 'mustache')

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/quiz', (request,response) => {
    console.log(`Quiz Started`)
    response.render("quiz");
})

app.get('/end', (request,response) => {
    response.render("end");
})

app.get('/endlesstrivia', (request, response) => {
    response.render("endlesstrivia");
})

app.post('/savetoleaderboard', (request, response) => {

        console.log('Form-Details', request.body)
    
        const client = new Client({
    
            user: 'postgres',
            host: 'localhost',
            password: 'adetoyosi',
            database: 'virtualquiz',
            port: 5432,
    
        });
    
        client.connect()
        .then(() => {
            console.log('Connection Complete !')
            const sql_query = "INSERT INTO leaderboard(name,score) VALUES ($1,$2)";
            const params = [request.body.nickname, request.body.score ];
            client.query(sql_query, params);
        })
    
        .then((result) => {
            console.log('results?', result);
            response.redirect('/leaderboard')
        })
    })


app.get('/leaderboard', (request, response) => {
    const client = new Client({

        user: 'postgres',
        host: 'localhost',
        password: 'adetoyosi',
        database: 'virtualquiz',
        port: 5432,

    });

     client.connect()
        .then(() => {
       
            return client.query('SELECT * FROM leaderboard ORDER BY -score LIMIT 10');
     })
 
        .then((results) => {
         console.log(results)
         response.render('leaderboard', results)
 
     })
})

app.get('/final', (request, response) => {
    response.render("finalendtrivia");
})



app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})