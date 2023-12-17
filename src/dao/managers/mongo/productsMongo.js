import {productsModel} from "../../models/products.model.js";
import {logger} from "../../../app.js"

export class ProductsMongo{
    constructor(){
        this.model = productsModel;
    };

    async get(){
        try {
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            logger.info(error.message);
            throw new Error("Hubo un error al obtener los productos");
        }
    };

    async save(productInfo){
        try {
            const productCreated = await this.model.create(productInfo);
            return productCreated;
        } catch (error) {
            logger.info(error.message);
            throw new Error("Hubo un error al crear el producto");
        }
    }

    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try {
            const productId = await this.model.findById(id);
            return productId;
        } catch (error) {
            logger.info(error.message);
            throw new Error(`Hubo un error al encontrar el producto`);
        }
    }

    async deleteProd(pid){
        try {
            const pDelete = await this.model.findByIdAndDelete(pid);
            return pDelete
        } catch (error) {
            logger.info(error.message);
            throw new Error(`Hubo un error al eliminar el producto`);
        }
    }

}