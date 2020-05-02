let db = require('./db');
let user = db.user;

let save = (obj) => {
    return new Promise((resolve, reject) => {
        obj['since'] = new Date();
        let users = new user(obj);
        users.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

let all = () => {
    return new Promise((resolve, reject) => {
        user.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        user.findById(id, (err, res) => {
            if (err) reject(err);
            resolve(res);
        })
    })
}

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        user.findOne({ "email": email }, (err, res) => {
            if (err){
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}

let findUserByName = (name) => {
    return new Promise((resolve, reject) => {
        user.findOne({ "name": name }, (err, res) => {
            if (err){
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}

module.exports = {
    save,
    all,
    findUserById,
    findUserByEmail,
    findUserByName
}