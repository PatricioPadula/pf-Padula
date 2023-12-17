import { CartsService } from "../services/carts.service.js";
import {ProductsService} from "../services/products.service.js"

export class CartsController {
  static getCarts = async (req, res) => {
    try {
      const cart = await CartsService.getCarts();
      res.json({ status: "success", data: cart });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  static createCart = async (req, res) => {
    try {
      const newCart = req.body;
      const cartCreated = await CartsService.createCart(newCart);
      res.json({
        status: "success",
        data: cartCreated,
        message: "carrito creado",
      });
    } catch (error) {
      res.json({ status: "error", message: "hubo un error al obtener los carritos" });
    }
  };

  static getCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await CartsService.getCart(cartId);
      if (cart) {
        res.json({
          status: "success",
          data: cart,
          message: "carrito encontrado",
        });
      } else {
        res.json({
          status: "error",
          message: `El carrito con id:${cid} no existe`,
        });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  static updateCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;

      const cart = await CartsService.getCart(cartId);
      if (cart) {
        const product = await ProductsService.getProduct(productId);

        const productExist = cart.products.find(product => product.productId === productId);

        if (productExist != undefined) {
          cart.products.quantity++;
        } else {
          const newProd = {
            productId: productId,
            quantity: 1,
          };
          cart.products.push(newProd);
        }

        const cartUpdated = await CartsService.updateCart(cartId, cart);
        res.json({ status: "success", data: cartUpdated });
      } else {
        res.json({ status: "error", message: `El carrito ${cid} no existe.` });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
