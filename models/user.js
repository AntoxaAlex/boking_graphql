const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdEvents: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
})

module.exports = mongoose.model("User",userSchema)