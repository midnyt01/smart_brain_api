import bodyParser from "body-parser";
import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from './controller/register.js';
import { handleSignin } from "./controller/signin.js";
import { handleProfile } from "./controller/profile.js";
import { handleImage } from "./controller/image.js";

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'test123',
        database: 'smart_brain'
    }
});

// db.select('*').from('users')

 
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(bodyParser.json())
app.use(cors());


app.post('/signin', (req, res) => {
    handleSignin(req, res, db, bcrypt);
})

app.post('/register', (req, res) => {
    handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
   handleProfile(res, req, db);
})

app.put('/image', (req, res) => {
    handleImage(req,res, db);
})

app.listen(8000, () => {
    console.log('app is listening on port 8000')
})












// res --> this is working
// signin --> post = sucess/fail
// register --> post = user
// profile --> user/:id --> get = user
// image --> put = user
