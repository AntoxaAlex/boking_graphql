const Event = require("../models/event");
const User = require("../models/user");

const user = async userId => {
    try{
        const foundUser = await User.findById(userId);
        return {
            ...foundUser._doc,
            _id: foundUser.id,
            createdEvents: events.bind(this,foundUser._doc.createdEvents)
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
                creator:user.bind(this,event._doc.creator)
            };
        })
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator:user.bind(this,event._doc.creator)
        };
    }catch (e) {
        console.log(e.message);
        throw e;
    }
}



exports.user = user;
exports.events = events;
exports.singleEvent = singleEvent;