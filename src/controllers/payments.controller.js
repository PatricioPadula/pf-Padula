import Stripe from "stripe";
import { ProductsService } from "../services/products.service.js";

const stripe = new Stripe("sk_test_51ONMEYGltsoWeGbCQt0ZGyQ15IZuhkClzItbJo2Br9I8Ji01KzdeWhNu4uFoHUprQoToXaQ1PwPPEtNfwKEnyPsC003cwrX1rE");

export class PaymentsController{
    static createSession = async(req,res)=>{
        const productId = req.params.pid;
        const product = await ProductsService.getProduct(productId);
        console.log(product);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data:{
                        product_data: {
                           name:product.name,
                           description:product.category,                        
                        },
                        currency:"usd",
                        unit_amount:product.price
                    },
                    quantity:1,
                }
            ],
            mode:"payment",
            success_url:"http://localhost:8080/success",
            cancel_url:"http://localhost:8080/api/payments/cancel"
        })
        return res.redirect(session.url)
    }
}