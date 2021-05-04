const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {returnUser} = require("../helpers/returnValues");
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}


module.exports = {
    user: async args => {
        try{
            const foundUser = await User.findById(args.id);
            return returnUser(foundUser)
        }catch (e) {
            console.log(e.message);
            throw e;
        }
    },
    register: async args=>{
        try{
            const user = await User.findOne({email: args.registerInput.email});
            if(user){
                throw new Error("User already exist")
            }else {
                const hashedPassword = await bcrypt.hash( args.registerInput.password,12);
                const newUser = await new User({
                    firstname: args.registerInput.firstname,
                    secondname: args.registerInput.secondname,
                    email: args.registerInput.email,
                    password:hashedPassword
                })
                await newUser.save();
                return returnUser(newUser)
            }
        }catch (e) {
            console.log(e.message);
            throw e;
        }
    },
    login: async args => {
        try{
            const foundUser = await User.findOne({email:args.email});
            if(!foundUser){
                throw new Error("User not exist")
            }else{
                const isMatched = await bcrypt.compare(args.password,foundUser.password);
                if(isMatched){
                    const token = jwt.sign({userId: foundUser.id, userEmail: foundUser.email},process.env.SECRET_KEY,{expiresIn: "1h"});
                    return {
                        userId: foundUser.id,
                        token: token,
                        tokenExpiration: 1
                    }
                }else{
                    throw new Error("Wrong password")
                }
            }
        }catch (e) {
            console.log(e);
            throw e;
        }
    }
}