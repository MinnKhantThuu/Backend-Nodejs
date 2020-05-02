let mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/mediaDB';
const connect = mongoose.connect(url, { useNewUrlParser: true });
let Schema = mongoose.Schema;

let autoincrement = require('mongoose-auto-increment');
let paginate = require('mongoose-paginate');

autoincrement.initialize(mongoose.connection);

let CatSchema = new Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    image: { type: String, require: true },
});

let ProductSchema = new Schema({
    cat_id:{type:Number,require:true},
    name:{type:String,require:true},
    price:{type:Number,require:true},
    image:{type:String,require:true},
    description:{type:String,require:true},
    since:{type:Date,require:true}
})

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    since: { type: Date, required: true }
})

let gallerySchema = new Schema({
    name:{type:String,required:true},
    since:{type:String,required:true}
});

ProductSchema.plugin(autoincrement.plugin, {model:'product',startAt:98});
ProductSchema.plugin(paginate);
gallerySchema.plugin(autoincrement.plugin, 'gallery');

let cat = mongoose.model('category', CatSchema);
let product = mongoose.model('product', ProductSchema);
let user = mongoose.model('user',userSchema);
let gallery = mongoose.model('gallery',gallerySchema);

module.exports = {
    cat,
    product,
    user,
    gallery
}