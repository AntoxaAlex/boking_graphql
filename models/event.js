const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking"
        }
]
})

module.exports = mongoose.model("Event",eventSchema)