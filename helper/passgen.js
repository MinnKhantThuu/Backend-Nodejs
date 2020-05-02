let bcrypt = require('bcrypt');

let encrypt = (pass) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                console.log(err);
            }else{
                bcrypt.hash(pass, salt, (err,res) => {
                    if (err) reject(err);
                    resolve(res);
                })
            }
        });
        
    })
}

let comparePass = (pass,hash)=>{            //pass is now entered pass  //hash is hashed pass
    return new Promise((resolve,reject)=>{
        bcrypt.compare(pass,hash,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

module.exports = {
    encrypt,
    comparePass
}