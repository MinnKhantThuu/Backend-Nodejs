let gallery = require('../database/gallery');
let product = require('../database/product');
let cat = require('../database/cat');

module.exports = (express) => {
    let router = express.Router();

    router.get('/products/:start/:count',(req,res)=>{
        let start = req.param('start');
        let count = req.param('count');

        product.paginate(Number(start),Number(count))
        .then(result=>res.send({con:true,msg:result}))
        .catch(err=>res.send({con:false,msg:err}));
    })

    router.get('/cats',(req,res)=>{
        cat.all()
        .then(result=>res.send({con:true,msg:result}))
        .catch(err=>res.send({con:false,msg:err}));
    })

    router.get('/galleries',(req,res)=>{
        gallery.all()
        .then(result=>res.send({con:true,msg:result}))
        .catch(err=>res.send({con:false,msg:err}));
    })

    return router;
}