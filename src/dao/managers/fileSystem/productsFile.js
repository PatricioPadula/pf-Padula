import { __dirname } from "../utils.js";
import path from "path";
import fs from "fs";

export class ProductManager{
    constructor(fileName){
        this.path = path.join(__dirname,`/files/${fileName}`);
    };

    fileExist(){
        return fs.existsSync(this.path);
    }

    async get(){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;
            }else{
                throw new Error("No es posible obtener los productos");
            };
        } catch (error) {
            throw error;
        }
    };

    async save(product){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                let newId = 1;
                if(products.length>0){
                    newId = products[products.length-1].id+1;
                }
                const newProduct = {
                    id:newId,
                    ...product
                }
                products.push(newProduct);
                await fs.promises.writeFile(this .path, JSON.stringify(products,null,"\t"));
                return newProduct;
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
                const products = JSON.parse(content);
                const prodId = products.find(prod => prod.id === id);
                if(prodId != undefined){
                    return prodId;
                }else{
                    throw new Error("No es posible obtener el producto");
                }
            }else{
                throw new Error("No es posible obtener el producto");
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteProd(id){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const prodDelete = products.find((o,i) => o.id !== id);
                return prodDelete;
            }else{
                throw new Error("No es posible obtener los productos");
            };
        } catch (error) {
            throw error;
        }
    }
}