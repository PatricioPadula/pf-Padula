import {logger} from "../app.js"

export const checkRole = (roles) =>{ // roles = ["admin"]
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        } else{
            res.json({status:"error", message:"No tienes permisos para usar este recurso"});
        }
    }
};

export const checkAuthenticated = (req,res,next) =>{
    if(req.user){
        next();
    } else{
        res.json({status:"error", message:"Debes estar autenticado"});
    }

}