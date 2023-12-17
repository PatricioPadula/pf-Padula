import { usersDao } from "../dao/managers/index.js";

export class UsersService{
    static getUsersAll = async()=>{
        return await usersDao.getAll();
    }

    static getUserByEmail = async(email)=>{
        return await usersDao.getByEmail(email);
    }

    static saveUser = async(newUser)=>{
        return await usersDao.save(newUser);
    }

    static getUserById = async(userId)=>{
        return await usersDao.getById(userId);
    }

    static updateUser = async(userId, userInfo)=>{
        return await usersDao.update(userId, userInfo);
    }

    static deleteUser = async(userId)=>{
        return await usersDao.delete(userId);
    }
}