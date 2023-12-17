import { productsDao } from "../dao/managers/index.js";

export class ProductsService{
    static getProducts = async()=>{
        return await productsDao.get();
    }

    static getProduct = async(pid)=>{
        return await productsDao.getById(pid)
    }

    static createProduct = async(newProduct)=>{
        return await productsDao.save(newProduct);
    }

    static deleteProduct = async(pid)=>{
        return await productsDao.deleteProd(pid);
    }
}