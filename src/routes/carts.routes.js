import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";
import { TicketsController } from "../controllers/tickets.controller.js";


const router = Router();

router.get("/", CartsController.getCarts)
router.post("/", CartsController.createCart)
router.get("/:cid", CartsController.getCart)
router.post("/:cid/product/:pid", CartsController.updateCart);

router.post("/:cid/purchase", TicketsController.createTicket)

export {router as cartsRouter}