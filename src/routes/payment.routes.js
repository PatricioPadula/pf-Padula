import { Router } from "express";
import { PaymentsController } from "../controllers/payments.controller.js";

const router = Router();

router.get("/create-checkout-session/:pid", PaymentsController.createSession)

router.get("/success", (req,res)=>{
    res.send("<h1>La compra se ha realizado con exito</h1>")
})

router.get("/cancel", (req,res)=>{
    res.send("<h1>La compra se ha cancelado</h1>")
})

export {router as paymentsRouter};