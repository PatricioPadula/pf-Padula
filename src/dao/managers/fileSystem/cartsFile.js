import { __dirname } from "../utils.js"
import path from "path"
import fs from "fs";

export class CartManager{
    constructor(fileName){
        this.path = path.join(__dirname,`/files/${fileName}`);
    };

    fileExist(){
        return fs.existsSync(this.path);
    }

    async getAll(){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                return carts;
            }else{
                throw new Error("No es posible obtener los carritos");
            };
        } catch (error) {
            throw error;
        }
    };

    async save(){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                let newId = 1;
                if(carts.length>0){
                    newId = carts[carts.length-1].id+1;
                }
                const newCart = {
                    id:newId,
                    products:[]
                }
                carts.push(newCart);
                await fs.promises.writeFile(this .path, JSON.stringify(carts,null,"\t"));
                return newCart;
            }else{
                throw new Error("No es posible esta operación");
            };
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                const cartId = carts.find(e => e.id === id);
                if(cartId != undefined){
                    return cartId;
                }else{
                    throw new Error("No es posible obtener el carrito");
                }
            }else{
                throw new Error("No es posible obtener el carrito");
            };
        } catch (error) {
            throw error;
        }
    }

    async update(id, info){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                const cartId = carts.find(e => e.id === parseInt(id));

                cartId.products = info.products;

                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

                return cartId;
            }else{
                throw new Error("No se pudo actualizar el carrito, no se encontró el archivo");
            };
        } catch (error) {
            throw error;
        }
    }
    
}