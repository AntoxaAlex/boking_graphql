const Event = require("../models/event");
const User = require("../models/user");
const {returnEvent} = require("../helpers/returnValues");




module.exports = {
    events: async () => {
        try{
            const events = await Event.find();
            return events.map(event=>{
                return returnEvent(event)
            })
        }catch (e) {
            console.log(e.message);
            throw e
        }
    },
    createEvent: async (args,req) => {
        let createdEvent;
        if(!req.isAuth){
            throw new Error("Unauthenticated")
        }
        try{
            const foundUser = await User.findById(req.userId);
            if(!foundUser){
                throw new Error("User not exist")
            }else{
                const event = await new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price:+args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: req.userId
                })
                await event.save();
                createdEvent = returnEvent(event)
                foundUser.createdEvents.push(createdEvent._id)
                await foundUser.save();
                return createdEvent
            }
        }catch (e) {
            console.log(e.message);
            throw e;
        }
    }
}