let db = require('./db');
let gallery = db.gallery;

let save = (obj)=>{
    return new Promise((resolve,reject)=>{
        obj['since'] = new Date();
        let gallerys = new gallery(obj);
        gallerys.save(obj,(err,data)=>{
            if(err)reject(err);
            resolve(data);
        })
    })
}

let all = ()=>{
    return new Promise((resolve,reject)=>{
        gallery.find({},(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}

module.exports = {
    save,
    all
}