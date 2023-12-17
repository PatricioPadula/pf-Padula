import mongoose from "mongoose";
import {config} from "./config.js"
import {logger} from "../app.js"

export const connectDB = async() =>{
    try {
        await mongoose.connect(config.mongo.url);
        logger.info("Base de datos conectada");
    } catch (error) {
        logger.info(`Error al conectar la base de datos ${error.message}`);
    }
}