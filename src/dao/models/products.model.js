import mongoose from "mongoose";

//nombre de la collección de productos
const productsCollection = "products";

//esquema de productos
const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["computación","celulares","cables"]
    },
    stock:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    thumbnail:{
        type:String,
        required:true
    }
});

export const productsModel = mongoose.model(productsCollection, productsSchema);