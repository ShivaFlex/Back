var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//connexion a mogoosedc
var mongoose = require('mongoose');
const url = process.env.DATABASE_URL

const cors = require('cors');
const { log } = require('console');
app.use(cors({credentials: true,origin:'https://yoga-delta-rose.vercel.app/'}));
 
//Method put et delete pour express
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//bcrypt : hashage de mot de passe

const bcrypt = require('bcrypt');

//Cookie parser
const cookieParser = require("cookie-parser")
app.use(cookieParser());

//import JWT
const {createTokens, validateToken} = require("./JWT")

//import jwt decode
const {jwtDecode} = require("jwt-decode");

//multer
const multer = require("multer")
app.use(express.static("uploads"));

//Inscription
app.post('/api/inscription', function(req,res){
    const Data = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        admin: req.body.admin
    })

    Data.save()
    .then(()=>{
        console.log('User saved');
        res.redirect('/connexion')
    })
    .catch(err=>{console.log(err);});
})


//Connexion

app.get('/inscription', function(req, res){
    res.json('Incription');
})
app.get('/connexion', function(req, res){
    res.json('Connexion')
})

app.post('/api/connexion', function(req, res){
    User.findOne({
        username: req.body.username
    })
    .then(user =>{
        if(!user){
            return res.status(404).send('User not found');
        }
        if(!bucrypt.compareSync(req.body.password, user.password)){
            returnres.status(404).send('Password Incorrecte');
        }
        const accessToken = createTokens(user)
        res.cookie("access-token", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30 * 12 ,
            httpOnly: true,
        })
        res.redirect(process.env.FRONTEND_URL +  "/accueil");

    })
    .catch(err =>{console.log(err);});
})

var server = app.listen(5000, function() {
    console.log('Serveur lancé sur le port 5000');

});
