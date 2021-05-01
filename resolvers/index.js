const bcrypt = require("bcryptjs");
const Event = require("../models/event");
const User = require("../models/user");

const user = async userId => {
    try{
        const foundUser = await User.findById(userId);
        return{...foundUser._doc, _id: foundUser.id, createdEvents: events.bind(this,foundUser._doc.createdEvents)}
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const events = async eventIds => {
    try{
        const foundEvents = await Event.find({_id:{$in: eventIds}});
        return foundEvents.map(event=>{
            return {...event._doc, _id: event.id, creator:user.bind(this,event.creator)}
        })
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

module.exports = {
    events: async () => {
        try{
            const events = await Event.find();
            return events.map(event=>{
                return {...event._doc, _id: event.id, date: new Date(event._doc.date).toISOString(), creator:user.bind(this,event._doc.creator)}
            })
        }catch (e) {
            console.log(e.message);
            throw e
        }
    },
        createEvent: async args => {
    let createdEvent;
    try{
        const foundUser = await User.findById(args.eventInput.creator);
        if(!foundUser){
            throw new Error("User not exist")
        }else{
            const event = await new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price:+args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: args.eventInput.creator
            })
            await event.save();
            createdEvent = {...event._doc, _id: event.id, creator: user.bind(this,foundUser._doc._id)}
            foundUser.createdEvents.push(createdEvent._id)
            await foundUser.save();
            return createdEvent
        }
    }catch (e) {
        console.log(e.message);
        throw e;
    }
},
    user: async args => {
    try{
        const foundUser = await User.findById(args.id);
        return {...foundUser._doc,createdEvents: events.bind(this,foundUser._doc.createdEvents)}
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
            return {...newUser._doc, _id: newUser.id}
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
                return {...foundUser._doc,_id:foundUser._doc.id, createdEvents: events.bind(this,foundUser._doc.createdEvents)}
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