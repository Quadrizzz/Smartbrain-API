const express = require('express');
const bodyParser =  require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require("./Controllers/register");
const image = require('./Controllers/image');
const profile = require('./Controllers/profile');
const signin = require('./Controllers/signin');
const db = knex({
    client : 'pg',
    connection : {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'mackenzii123',
        database : 'smartbrain'
    }
})

// db.select('*').from('users').then(data=> console.log(data));

const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get('/' , (req,res)=>{
    res.json(database.users)
});

app.get('/profile/:id' , (req, res)=> {
    profile.getProfile(req, res, db)
})

app.put('/image' , (req, res)=> {
    image.handleImage(req, res, db)
})

app.post('/imageurl' , (req ,res)=>{
    image.handleAPICall(req,res)
})

app.post('/signin' , (req , res) => {
    signin.handleSignin(req , res, db, bcrypt)
})

app.post('/register' , (req , res) => {
    register.handleRegister(req, res, db, bcrypt)
});

app.listen(3000 , ()=>{
    console.log("App is running on port 3000")
})