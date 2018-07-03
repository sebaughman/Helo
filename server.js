const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session')
const Auth0Strategy = require('passport-auth0')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(session({
    name: 'Helo-App',
    secret: process.env.SECRET, 
    cookie: {
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}))

massive(process.env.CONNECTION_STRING)
    .then(db =>{
        app.set('db', db)
    })
    .catch(err=>{
        console.error(`can connect to db: ${err}`)
    })


    // --------Authentication -----------//

passport.use( 'register', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
    }, 
    (req, email, password, done)=>{
        //go to the db and find a user with this email
        req.db.users.findOne({ email })
            .then((user)=>{
                //If this email does not exist in the db, create a row with the email and encrypted password
                if(!user){
                    password = bcrypt.hashSync(password, bcrypt.genSaltSync(15));
                    req.db.users.insert({ email: email, password: password, image: 'https://robohash.org/me' })
                        .then(user=>{
                            delete user.password;
                            return done(null, user)
                        })
                }
                //if the email does exist in the db throw error and ask user to log in
                else{
                   return done('Account already exists. Please Login')
                }
            })
            .catch(err => done(err))
}));

passport.use( 'login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
    }, 
    (req, email, password, done)=>{
        //go to the db and find a user with this email
        req.db.users.findOne({ email })
            .then((user)=>{
                //If this email does not exist in the db, throw error
                if(!user){
                    return done('Email or password is incorrect')
                }
                //if the email does exist in the db check password against encrypted password on the db
                else{
                    if(!bcrypt.compareSync(password, user.password)){
                        return done('Incorrect Password')
                    }
                    else{
                        delete user.password
                        return done(null, user)
                    }
 
                }
            })
            .catch(err => done(err))
}));

passport.serializeUser((user, done)=>{
    if(!user){
        done('No User')
    }
    //puts the user.id on the session and sends it to the client
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    const db = app.get('db')
    db.users.findOne({id: id})
        .then((user)=>{
            if(!user){
                return done(null, false)
            }
            //puts the entire user object on req
            delete user.password
            done(null, user)
        })
})

app.use(passport.initialize())
app.use(passport.session())



// --------Custom Middleware ---------//
function checkDb() {
    return (req, res, next) => {
        const db = app.get('db');            
            if (db) {
                req.db = db;
                next();
            }
            else {
                res.status(500).send({ message: 'database not connected' });
            }
    };
}

app.use(checkDb());


//------ENDPOINTS------//

app.post('/api/login', passport.authenticate('login'), (req, res)=>{
    res.send({message: 'Login Successful'})
})

app.post('/api/register', passport.authenticate('register'), (req, res)=>{
    res.send({message: 'Registration Successful'})
})

app.get(`/api/user`, (req, res)=>{
    req.db.users.findOne({id: req.user.id})
        .then(user=>{
            delete user.password
            res.send(user)
        })
})

app.post(`/api/user`, (req, res)=>{
    req.db.users.insert(req.body)
        .then(response=>{
            res.send(response)
        })
})

app.put(`/api/user`, (req, res)=>{
    req.db.users.update(req.body)
        .then(response=>{
            res.send(response)
        })
})


app.get(`/api/friends`, (req, res)=>{
    
    req.db.GET_FRIENDS([req.user.id])
        .then(response=>{
            let friends = response
                .filter(friend=>friend.email != req.user.email)
            res.send(friends)
        })
        .catch(err=>{
            console.log(err)
        })
})


app.get(`/api/recommended`, (req, res)=>{
    req.db.users.find()
        .then(response=>{
            let users = response
                .filter(user=>user.email != req.user.email)
                res.send(users)
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get(`/api/users/:page`,(req, res)=>{
    const itemsPerPage = 2;
    const page = req.params.page - 1;
    const offset = itemsPerPage * page
    req.db.GET_PAGES()
        .then(result=>{
            const pages = Math.ceil(result[0].count / itemsPerPage)
            req.db.GET_USERS([itemsPerPage, offset])
                .then(response=>{
                        let users = response.filter(user=>user.email != req.user.email)
                        res.send({pages: pages, users: users})
                })
        })
    
})


app.post(`/api/friend`, (req, res)=>{
    req.db.friendships.insert({user_one: req.user.id, user_two: req.body.id})
        .then(response=>{
            req.db.users.findOne({id:req.body.id})
                .then(friend=>{
                    res.send(friend)
                })
            
        })
})


app.put(`/api/friend`, (req, res)=>{
    req.db.REMOVE_FRIENDSHIP([req.user.id, req.body.id])
        .then(response=>{
            let friends = response
                .filter(friend=>friend.email != req.user.email)
            res.send(friends)
        })
        .catch(err=>{
            console.log(err)
        })
})



const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`This server is listening on port ${port}`)
})