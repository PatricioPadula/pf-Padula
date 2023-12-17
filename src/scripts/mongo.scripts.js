import mongoose from "mongoose";
import { productsModel } from "../dao/models/products.model.js";
import {config} from "../config/config.js"

const updateProducts = async ()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("base de datos conectada");
        const adminId = "65188b66b10de8f18e7fc4e9";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally{
        await mongoose.connection.close();
    }

};

updateProducts();