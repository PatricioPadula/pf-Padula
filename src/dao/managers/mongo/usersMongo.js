import {usersModel} from "../../models/user.model.js"
import {logger} from "../../../app.js"


export class UsersMongo{
    constructor(){
        this.model = usersModel;
    };

    async getAll(){
        try {
            const users = await this.model.find().lean();
            return users
        } catch (error) {
            throw error;
        }
    }

    async save(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };

    async getById(userId){
        try {
            const user = await this.model.findById(userId).lean();
            if(user){
                return user;
            }else{
                throw new Error("El usuario no existe");
            }
        } catch (error) {
            throw error;   
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await this.model.findOne({email:userEmail});
            if(user){
                return user;
            }else{
                return null;
            }
        } catch (error) {
            throw error;   
        }
    }

    async update(userId,newUserInfo){
        try {
            const userUpdated = await this.model.findByIdAndUpdate(userId,newUserInfo,{new:true})
            return userUpdated;
        } catch (error) {
            logger.info(error.message);
            throw error;
        }
    };

    async delete(userId){
        try {
            const userDelete = await this.model.findByIdAndDelete(userId)
            return userDelete;
        } catch (error) {
            logger.info(error.message);
            throw error;
        }
    }
}