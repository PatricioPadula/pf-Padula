import { UsersService } from "../services/users.service.js"


export class UsersController{
    static getUsers = async(req,res)=>{
        try {
            const users = await UsersService.getUsersAll();
            res.render("users", { users: users })
        } catch (error) {
            res.json({status:"error", message:"No se pudo obtener los usuarios"})
        }
    }

    static deleteUsers = async(req,res)=>{
        try {
            const { id } = req.params;
            await UsersService.deleteUser(id);
            res.redirect("/api/users")
            /* res.send({status:"success", message:"se elimino el usuario"}) */
        } catch (error) {
            res.json({status:"error", message:"No se pudo elimiar los usuarios"})
        }
    }

    static modifyRole = async (req,res)=>{
        try {
            const userId = req.params.uid; 
            const user = await UsersService.getUserById(userId);
            const userRole = user.role;
            //validación del estado del usuario
            if(user.documents.length>=3 && user.status === "completo"){
                if(userRole === "user"){
                    user.role = "premium";
                } else if(userRole === "premium"){
                    user.role = "user";
                } else{
                    return res.json({status:"error", message:"No se puede cambiar el rol de este usuario"})
                }
                await UsersService.updateUser(user._id,user);
                return res.json({status:"error", message:`El nuevo rol del usuario es ${user.role}`})
            }else{
                res.json({status:"error", message:"El usuario no a cargado todos los documentos"})
            }
        } catch (error) {
            res.json({status:"error", message:error.menssage})
        }
    }

    static uploadsDocuments = async (req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            const identificacion = req.files?.identificacion?.[0] || null;
            const domicilio = req.files?.domicilio?.[0] || null;
            const estadoDeCuenta = req.files?.estadoDeCuenta?.[0] || null;
            const docs = [];
            if(identificacion){
                docs.push({name:"identificación", reference:identificacion.filename})
            }
            if(domicilio){
                docs.push({name:"domicilio", reference:domicilio.filename})
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference:estadoDeCuenta.filename})
            }
            user.documents = docs;
            if(docs.length === 3){
                user.status = "completo";
            } else{
                user.status = "incompleto";
            }
            const result = await UsersService.updateUser(user._id, user);
            res.json({status:"success", data:result})
        } catch (error) {
            res.json({status:"error", message:"No se pudo cargar los documentos"})
        }
    }
}