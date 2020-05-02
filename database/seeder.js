let fs = require('fs');
let cat = require('./cat');
let product = require('./product');

let catSeed = (filepath) => {
    fs.access(filepath,fs.F_OK,err=>{
        if(err) console.log(err);
        fs.readFile(filepath, (err, data) => {
            if (err) console.log(err);
            let cats = JSON.parse(data);
            cats.forEach((cate) => {
                let obj = {
                    id: cate.id,
                    name: cate.name,
                    image: cate.image
                }
                cat.save(obj)
                    .then(res => console.log(res));
            })
        })
    })
}

let productSeed = (filepath) => {
    fs.access(filepath,fs.F_OK,err=>{
        if(err) console.log(err);
        fs.readFile(filepath, (err, data) => {
            if (err) console.log(err);
            let pros = JSON.parse(data);
            pros.forEach((pro) => {
                let obj = {
                    "cat_id": pro.cat_id,
                    "name": pro.title,
                    "price": pro.price,
                    "image": pro.image,
                    "description":pro.description
                }
                product.save(obj)
                    .then(res => console.log(res));
            })
        })
    })
}

module.exports = {
    catSeed,
    productSeed
}
