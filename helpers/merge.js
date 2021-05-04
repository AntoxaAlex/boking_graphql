const Event = require("../models/event");
const User = require("../models/user");


const user = async userId => {
    console.log(userId)
    try{
        const foundUser = await User.findById(userId);
        return returnUser(foundUser)
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const events = async eventIds => {
    try{
        const foundEvents = await Event.find({_id:{$in: eventIds}});
        return foundEvents.map(event=>{
            return returnEvent(event)
        })
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return returnEvent(event)
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const returnEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator:user.bind(this,event._doc.creator)
    };
}

const returnUser = user => {
    return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this,user._doc.createdEvents)
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

exports = returnUser()
exports = returnBooking()
exports = returnEvent()