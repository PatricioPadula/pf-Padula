import passport from "passport";
import LocalStrategy from "passport-local";
import {createHash, isValidPassword} from "../utils.js"
import { UsersService } from "../services/users.service.js";


export const initializatePassport = () =>{
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async (req, username, password, done)=>{
            try {
                const {first_name, last_name, age} = req.body;
                console.log(req.file);
                //verifico si el usuario ya se registro
                const user = await UsersService.getUserByEmail(username);
                if(user){
                    return done(null, false);
                }
                let role = "user";
                if(username.endsWith("@coder.com")){
                    role = "admin";
                }
                const newUser = {
                    first_name: first_name,
                    email: username,
                    password: createHash(password),
                    role:role,
                    avatar:req.file.filename
                };
                const userCreated = await UsersService.saveUser(newUser);
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        async(username,password,done)=>{
            try {
                //verifico si el usuario ya se registro
                const user = await UsersService.getUserByEmail(username);
                if(!user){
                    return done(null, false)
                }
                //si el usuario ya se registro, validar la contraseña
                if(isValidPassword(user,password)){
                    user.last_connection = new Date();
                    await UsersService.updateUser(user._id,user);
                    return done(null, user);
                } else{
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    //serialización y deserializacion 
    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await UsersService.getUserById(id);
        done(null, user); //req.user ---> sessions
    });
};