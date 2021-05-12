const Event = require("../models/event");
const User = require("../models/user");
const Booking = require("../models/booking")
const {returnEvent,returnEvents} = require("../helpers/returnValues");




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
                    imageUrl: args.eventInput.imageUrl,
                    description: args.eventInput.description,
                    price:+args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: req.userId
                })
                await event.save();
                createdEvent = returnEvent(event)
                await foundUser.createdEvents.push(createdEvent._id)
                await foundUser.save();
            }

            return returnEvents()
        }catch (e) {
            console.log(e.message);
            throw e;
        }
    },
    editEvent:async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated")
        }
        try {
            const event = await Event.findByIdAndUpdate(args.eventId,args.eventInput,{new:true});
            await event.save();
            const events = await Event.find();
            return events.map(event=>{
                return returnEvent(event)
            })

        }catch (e) {
            console.log(e.message);
            throw e;
        }
    },
    deleteEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated")
        }
        try {
            const event = await Event.findById(args.eventId);
            const user = await User.findById(event.creator);
            await user.createdEvents.splice(user.createdEvents.indexOf(args.eventId),1);
            await user.save();
            await Booking.deleteMany({_id:{$in: event.bookings}});
            await Event.findByIdAndRemove(args.eventId);
            const events = await Event.find();
            return events.map(event=>{
                return returnEvent(event)
            })

        }catch (e) {
            console.log(e.message);
            throw e;
        }
    }
}