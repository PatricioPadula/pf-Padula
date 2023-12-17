import { ProductsMongo} from "./mongo/productsMongo.js";
import { UsersMongo } from "./mongo/usersMongo.js"
import { CartsMongo } from "./mongo/cartsMongo.js"
import { TicketsMongo } from "./mongo/ticketsMongo.js";

export const productsDao = new ProductsMongo();
export const usersDao = new UsersMongo();
export const cartsDao = new CartsMongo();
export const ticketsDao = new TicketsMongo();
