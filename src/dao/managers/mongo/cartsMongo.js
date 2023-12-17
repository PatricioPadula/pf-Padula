import { cartsModel } from "../../models/carts.model.js";
import {logger} from "../../../app.js"

export class CartsMongo{
    constructor(){
        this.model = cartsModel;
    };

    async getAll(){
        try {
            const carritos = await this.model.find().lean();
            return carritos;
        } catch (error) {
            logger.info(error.message);
            throw new Error("Hubo un error al obtener los carritos");
        }
    }

    async save(cart){
        try {
            const carritoCreated = await this.model.create(cart);
            return carritoCreated;
        } catch (error) {
            logger.info(error.message);
            throw new Error("Hubo un error al crear el carrito");
        }
    }

    async update(cartId, cart){
        try {
            const cartUpdated = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
            return cartUpdated;
        } catch (error) {
            logger.info(error.menssage);
        }
    }

    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try {
            const cartId = await this.model.findById(id);
            if(!cartId){
                throw new Error(`Hubo un error al encontrar el carrito`);
            }
            return cartId;
        } catch (error) {
            logger.info(error.message);
            throw new Error(`Hubo un error al encontrar el carrito`);
        }
    }
}