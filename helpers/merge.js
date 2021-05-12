const Event = require("../models/event");
const User = require("../models/user");
const Booking = require("../models/booking");
const DataLoader = require("dataloader");

//Loaders
const eventLoader = new DataLoader(eventIds=>{
    return events(eventIds)
})
const userLoader = new DataLoader(userIds=>{
    return User.find({_id:{$in: userIds}})
})
const bookingsLoader = new DataLoader(bookingIds=>{
    return bookings(bookingIds)
})

const user = async userId => {
    try{
        const foundUser = await userLoader.load(userId.toString());
        return {
            ...foundUser._doc,
            _id: foundUser.id,
            createdEvents:() => eventLoader.loadMany(foundUser._doc.createdEvents),
            bookings:() => bookingsLoader.loadMany(foundUser._doc.bookings)
        }
    }catch (e) {
        console.log(e);
        throw e;
    }
}

const events = async eventIds => {
    try{
        const foundEvents = await Event.find({_id:{$in: eventIds}});
        return foundEvents.map(event=>{
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator:user.bind(this,event._doc.creator),
                bookings: bookings.bind(this,event._doc.bookings)
            };
        })
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const singleEvent = async eventId => {
    try {
        return await eventLoader.load(eventId);
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const bookings = async bookingIds => {
    try {
        const bookings = await Booking.find({_id:{$in: bookingIds}});
        return bookings.map(booking=>{
            return {
                ...booking._doc,
                id:booking.id,
                event: singleEvent.bind(this,booking._doc.event),
                user: user.bind(this,booking._doc.user)
            };
        })
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}



exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;
exports.bookings = bookings;