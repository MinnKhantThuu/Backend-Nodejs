require('dotenv').config();
let express = require('express'),
    app = express();
let jwt = require('jsonwebtoken');
let passport = require('passport');
let bodyparser = require('body-parser');
let user = require('./database/user');
let path = require('path');
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let seeder = require('./database/seeder');


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
let myStrategy = new JwtStrategy(opts, (payload, done) => {
    let email = payload.email;
    let name = payload.name;
    user.findUserByEmail(email)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch(err => done(err, null));
})
passport.use(myStrategy);


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join('./assets')));

let guestRoute = require('./routes/guest')(express);
let userRoute = require('./routes/user')(express, jwt);
let adminRoute = require('./routes/admin')(express, passport);

app.use('/', guestRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})