let db = require('./db');
let product = db.product;

let all = () => {
    return new Promise((resolve, reject) => {
        product.find({}, (err, data) => {        // to find all in database
            if (err) reject(err);
            resolve(data);
        });
    })
}

let save = (obj) => {
    return new Promise((resolve, reject) => {
        obj['since'] = Date.now();
        let pros = new product(obj);
        pros.save((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}

let update = (obj) => {
    return new Promise((resolve, reject) => [
        product.findById(obj.id, (err, data) => {
            if (err) reject(err);
            data.save((err, dat) => {
                if (err) reject(err);
                resolve(dat);
            });
        })
    ])
}

let destroy = (id) => {
    return new Promise((resolve, reject) => {
        product.deleteOne({ _id: id }, err => {
            if (err) reject(err);
            resolve('OK');
        })
    })
}

let destroys = ()=>{
    return new Promise((resolve,reject)=>{
        product.find({},(err,data)=>{
            if(err) throw err;
            data.forEach((datas)=>{
                product.deleteOne({_id:datas.id},(err)=>{
                    if(err) reject('err');
                    resolve("OK");
                })
            })
        })
    })
}

let paginate = (start,count)=>{
    let options = {
        sort : {_id:1},
        lean:true,
        page:start,
        limit:count
    }
    return new Promise((resolve,reject)=>{
        product.paginate({},options,(err,res)=>{
            if(err) reject(err);
            resolve(res);
        })
    })
}

let findProductsById = (id) => {
  return new Promise((resolve,reject)=>{
    product.find({"cat_id":id},(err,res)=>{
        if(err) reject(err);
        resolve(res);
    })
  })
}

module.exports = {
    all,
    save,
    update,
    paginate,
    destroy,
    destroys,
    findProductsById
}