const Event = require("../models/event");
const Booking = require("../models/booking");
const User = require("../models/user")
const {returnBooking,returnEvent} = require("../helpers/returnValues");


module.exports = {
    bookings: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated")
        }
        try {
            const bookings = await Booking.find();
            if(bookings.length > 0){
                return bookings.map(booking=>{
                    return returnBooking(booking)
                })
            }
        }catch (e) {
            console.log(e.message);
            throw e
        }
    },

    bookEvent: async (args, req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated")
        }
        try {
            console.log("Event id: "+args.eventId)
            const fetchedEvent = await Event.findById(args.eventId);
            const booking = new Booking({
                user:req.userId,
                event:fetchedEvent
            })
            await booking.save();
            await fetchedEvent.bookings.push(booking)
            await fetchedEvent.save()

            const user = await User.findById(req.userId);
            await user.bookings.push(booking);
            await user.save()

            const events = await Event.find();
            return events.map(event=>{
                return returnEvent(event)
            })
        }catch (e) {
            console.log(e.message);
            throw e;
        }
    },

    cancelBooking: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated")
        }

        try {
            const booking = await Booking.findOne({event: args.eventId});
            const user = await User.findById(req.userId);
            await user.bookings.splice(user.bookings.indexOf(booking._id),1);
            await user.save();
            const event = await Event.findById(args.eventId);
            await event.bookings.splice(user.bookings.indexOf(booking._id),1);
            await event.save();
            await Booking.findOneAndRemove({user:req.userId,event:args.eventId});
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