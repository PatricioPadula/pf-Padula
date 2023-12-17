import { cartsDao } from "../dao/managers/index.js";

export class CartsService{
    static getCarts = async()=>{
        return await cartsDao.getAll();
    }
    
    static createCart = async(cartInfo)=>{
        return await cartsDao.save(cartInfo);
    }

    static getCart = async(cartId)=>{
        return await cartsDao.getById(cartId)
    }

    static updateCart = async(cartId, cart)=>{
        return await cartsDao.update(cartId, cart);
    }

}