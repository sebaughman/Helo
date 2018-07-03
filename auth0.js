
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new Auth0Strategy({    
        domain:       process.env.DOMAIN,
        clientID:     process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:  process.env.CALLBACK_URL,
        scope:        'openid profile'
    },function(accessToken, refreshToken, extraParams, profile, done) {
      const db = app.get('db')
        db.users.findOne({id: profile.id})
            .then(user=>{
                if(!user){
                    db.users.insert({auth_id: profile.id, first_name: profile.given_name, last_name: profile.family_name})
                        .then(user=>{
                            done(null, user.id)
                        })
                }
                else{
                    return done(null, user.id);
                }
            })
            .catch(err=>{
                console.error(err)
            })
       
      }))
    
    //req.session.passport.user
    passport.serializeUser((id, done)=>{
        done(null, id)
    })
    
    //creates a req.user object
    passport.deserializeUser((id, done)=>{
        const db = app.get('db')
        db.users.findOne({id: id})
            .then(response=>{
                done(null, response.id)
            })
    });

     app.get(`/auth`, passport.authenticate('auth0'))

     app.get(`/auth/callback`, passport.authenticate('auth0', {
         successRedirect: 'http://localhost:8080/dashboard'
     }))



