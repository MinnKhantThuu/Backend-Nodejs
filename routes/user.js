let passgen = require('../helper/passgen');
let user = require('../database/user');

module.exports = (express, jwt) => {
    let router = express.Router();

    router.post('/api/login', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        user.findUserByEmail(email)
            .then(user => {
                if (user != null) {
                    passgen.comparePass(password, user.password)
                        .then(result => {
                            if (result == true) {
                                let payload = { "email": user.email, "name": user.name };
                                let token = jwt.sign(payload, process.env.SECRET);
                                res.json({ con: true, token: token });
                            } else {
                                res.send('Your email password is wrong');
                            }
                        })
                } else {
                    res.send('This Email does not exist');
                }
            }).catch(error => res.send({ con: false, msg: error }));
    })

    router.post('/api/register', (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        user.findUserByEmail(email)
            .then(findedEmail => {
                if (findedEmail == null) {
                    passgen.encrypt(password)
                        .then(pass => {
                            let obj = {
                                "name": name,
                                "email": email,
                                "password": pass
                            }
                            user.save(obj)
                                .then(result => res.send(result))
                                .catch(error => res.send(error));
                        })
                        .catch(err => res.send(err));
                } else {
                    res.send('Email is already taken');
                }
            })
            .catch(err => res.send(err));
    })

    return router;
}