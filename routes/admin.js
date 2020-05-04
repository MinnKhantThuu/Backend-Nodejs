let multer = require('multer');
let gallery = require('../database/gallery');
let product = require('../database/product');
let cat = require('../database/cat');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
})
let upload = multer({ storage: storage });

module.exports = (express, passport) => {

    let router = express.Router();

    router.get('/image/delete/:id',passport.authenticate('jwt', { session: false }),(req,res)=>{
        let id = req.param('id');
        gallery.destroy(Number(id))
        .then(result=>res.json({con:true,msg:result}))
        .catch(err=>res.json({con:false,msg:err}));
    })

    router.post('/image/upload', passport.authenticate('jwt', { session: false }),
     upload.single('image'), (req, res, next) => {
        obj = {
            name : req.file.filename
        }
        gallery.save(obj)
        .then(result=>res.json({con:true,msg:result}))
        .catch(err=>res.json({con:false,msg:err}));
    })

    router.get('/product/paginate/:start/:count',passport.authenticate('jwt', { session: false }),(req,res)=>{
        let start = req.param('start');
        let count = req.param('count');

        product.paginate(Number(start),Number(count))
        .then(result=>res.send({con:true,msg:result}))
        .catch(err=>res.send({con:false,msg:err}));
    })

    router.get('/cat/all',passport.authenticate('jwt',{session:false}),(req,res)=>{
        cat.all()
        .then(result=>res.send({con:true,msg:result}))
        .catch(err=>res.send({con:false,msg:err}));
    })

    router.get('/gallery/all',passport.authenticate('jwt',{session:false}),(req,res)=>{
        gallery.all()
        .then(result=>res.send({con:true,msg:result}))
        .catch(err=>res.send({con:false,msg:err}));
    })

    router.post('/product/create',passport.authenticate('jwt',{session:false}),(req,res)=>{
         let obj = {
            cat_id : req.body.cat_id,
            name : req.body.name,
            price : req.body.price,
            image : req.body.image,
            description : req.body.description
         }
         product.save(obj)
         .then(result=>res.send({con:true,msg:result}))
         .catch(err=>res.send({con:false,msg:err}));
    })

    return router;
}