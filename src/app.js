import express from "express";
import {config} from "./config/config.js"
import { connectDB } from "./config/dbConnection.js";
import { engine } from "express-handlebars";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { __dirname } from "./utils.js";
import path from 'path';
import {Server} from "socket.io";
import { viewsRouter } from "./routes/views.routes.js";
import { chatModel } from "./dao/models/chat.model.js";
import passport from "passport";
import session from "express-session"
import { initializatePassport } from "./config/passport.config.js";
import MongoStore from "connect-mongo";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { addLogger } from "../src/helpers/logger.js";
import { usersRouter } from "./routes/users.routes.js";
import { paymentsRouter } from "./routes/payment.routes.js";


const port = config.server.port;
const app = express();
export const logger = addLogger();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname, "/public")));

//configuración de handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


const httpServer = app.listen(port,()=>logger.info(`Server listening on port ${port}`));

//conexión a la base de datos
connectDB();

//configuración de session
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
}));

//configuración de passport
initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(viewsRouter);
app.use("/api/sessions",sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/payments", paymentsRouter);

app.get("/loggerTest", (req,res)=>{
    logger.silly("mensaje de nivel silly")
    logger.info("mensaje de nivel info")
    logger.debug("mensaje de nivel debug")
    logger.http("mensaje de nivel http")
    logger.error("mensaje de nivel error")
    logger.warn("mensaje de nivel warn")
    logger.verbose("mensaje de nivel verbose")
    res.send("peticion recibida");
})

//creación del servidor de websocket
const io = new Server(httpServer);



//canal de comunicación
io.on("connection", (socket)=>{
    logger.info("nuevo cliente conectado");

    socket.on("authenticated", async(msg)=>{
        const messages = await chatModel.find();
        socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser", msg);
    });

    socket.on("message", async(data)=>{
        const messageCreated = await chatModel.create(data);
        const messages = await chatModel.find();

        io.emit("messageHistory", messages);
    })
});