import { ProductsService } from "../services/products.service.js";
import {logger} from "../app.js"

export class ProductsController{
    static getProducts = async(req,res)=>{
        try {
            const limit = req.query.limit;
            const products = await ProductsService.getProducts();
            if(limit){
                //devolver los productos de acuerdo al limite
                const filtro = products.slice(0, limit);
                res.render("products", {data:filtro}); 
            }else{
                res.render("products", { products: products });
                /* res.json({status:"success", data:products});   */          
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    
    static getProduct = async(req,res)=>{
        try {
            const pid = req.params.pid;
            const productosId = await ProductsService.getProduct(pid);
            res.json({status:"success", data:productosId});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
        
    };

    static createProduct = async(req,res)=>{
        try {
            const newProduct = req.body;
            newProduct.owner = req.user._id;
            productInfo.thumbnail = req.file.filename;
            const productCreated = await ProductsService.createProduct(newProduct);
            res.json({status:"success", data:productCreated, message:"producto creado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static updateProduct = (req,res) =>{
        const newProduct = req.body;    
    };

    static deleteProduct = async(req,res)=>{
        try {
            const pid = req.params.pid;
            const productosId = await ProductsService.getProduct(pid);
            logger.info(productosId);
            if((req.user.role === "premium" && productosId.owner.toString() === req.user._id.toString()) || req.user.role === "admin"){
                await ProductsService.deleteProduct(pid);
                if(req.user.role === "premium"){
                    await gmailTransporter.sendMail({
                        from:"Ecommerce pepito",
                        to: userEmail,
                        subject:"Borraste un producto",
                        html: `
                            <p>Borraste un producto del ecommerce</p>
                        `
                    });
                }
                res.json({status:"success", message:"el producto se eliminó con éxito"});
                
            } else{
                return res.json({status:"error", message:"no tienes permisos"});
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }
}