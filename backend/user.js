const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/userModel');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users));
});

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password ) {
        return res.status(400).json({ error: "Plz fill all the fields 😢" });
    }
    try {
        const preuser = await User.findOne({ email: email })
        if (preuser) {
            res.status(422).json({ error: "User Already Registered 😠" })
        }
        else if (!email.includes('@')) {
            res.status(422).json({ error: "Email is invalid 👎" })

        }
        else {
            const finalUser = new USER({
                name, email, password,
            });


            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }

    }
    catch (error) {
        res.status(400).json({ error: "Invalid Details" })
    }

});


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email,password,done){
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect Email.' });
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect password.'});
                }
            });


        });

    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login', function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {

        if (err) { return next(err); }
        if (!user) { return res.status(400).json({message:info.message}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({ id:req.user.id, email:req.user.email });
        });
    })(req, res, next);
});
router.get('/logout',(req,res)=>{
    req.logout();
    res.sendStatus(200);
});

module.exports = router;