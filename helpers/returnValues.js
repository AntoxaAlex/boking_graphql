const {user,singleEvent,events,bookings} = require("./merge")

const transformTime = require("./transformTime")


const returnEvents = async () => {
    const events = await Event.find();
    return events.map(event=>{
        return returnEvent(event)
    })
}

const returnEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: transformTime(new Date(event._doc.date).toISOString()),
        creator:user.bind(this,event._doc.creator),
        bookings: bookings.bind(this,event._doc.bookings)
    };
}

const returnUser = user => {
    return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this,user._doc.createdEvents),
        bookings: bookings.bind(this,foundUser._doc.bookings)
    }
}

const returnBooking = booking => {
    return{
        ...booking._doc,
        _id:booking.id,
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        user: user.bind(this,booking._doc.user),
        event:singleEvent.bind(this,booking._doc.event)
    }
}

exports.returnUser = returnUser;
exports.returnEvent = returnEvent;
exports.returnBooking = returnBooking;
exports.returnEvents = returnEvents;
