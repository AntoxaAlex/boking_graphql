const Event = require("../models/event");
const Booking = require("../models/booking")
const {returnBooking} = require("../helpers/returnValues");


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
            const fetchedEvent = await Event.findById(args.eventId);
            const booking = new Booking({
                user:req.userId,
                event:fetchedEvent
            })
            await booking.save();
            return returnBooking(booking)
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
            const userId = booking.user;
            await Booking.findOneAndRemove({event:args.eventId});
            const bookings = await Booking.find({user:userId});
            return bookings.map(booking=>{
                return returnBooking(booking)
            })

        }catch (e) {
            console.log(e.message);
            throw e;
        }
    }
}