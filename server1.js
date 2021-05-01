const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const {graphqlHTTP} = require("express-graphql")
const {buildSchema} = require("graphql")

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const dbUrl = process.env.DBURL;
const dbConnect = require("./config/db")

const Event = require("./models/event");
const User = require("./models/user")

const user = async (userId) => {
    try {
        const foundUser = await User.findById(userId)
        return foundUser
    }catch (e) {
        console.log(e.message);
        throw e
    }
}
const event = async (eventIds) => {
    try {
        const foundEvents = await Event.find({_id:{$in: eventIds}});
        return foundEvents
    }catch (e) {
        console.log(e.message);
        throw e
    }
}


app.use(bodyParser.json());
app.use("/graphql",graphqlHTTP({
    schema: buildSchema(`
        type User{
            _id: ID!
            firstname: String!
            secondname: String!
            email: String!
            password: String
            createdEvents: [Event!]
        }
        
        type Event {
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }
    
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: ID!
        }
        
        input UserInput {
            firstname: String!
            secondname: String!
            email: String!
            password: String!
        }
    
        type RootQuery {
            events: [Event!]
            users(id:[ID!]): User!
        }
        
        type RootMutation {
            createEvent(eventInput: EventInput):Event
            register(userInput: UserInput): User
            login(email: String!,password: String!): User
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue:{
        events: async ()=>{
            try {
                const events = await Event.find().populate("creator");
                return events
            }catch (e) {
                console.log(e.message);
                throw e
            }
        },
        user: async (args)=>{
            try {
                const user = await User.findById(args.id)
                return user
            }catch (e) {
                console.log(e.message);
                throw e
            }
        },
        createEvent:async (args) => {
            try {
                const newEvent = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: user(args.eventInput.creator)
                })
                const selectedUser = await User.findById(args.eventInput.creator);
                selectedUser.createdEvents.push(newEvent);
                await selectedUser.save()
                await newEvent.save();
                return newEvent
            }catch (e) {
                console.log(e.message);
                throw e;
            }
        }
    },
    graphiql: true
}))

app.listen(4000,()=>{
    console.log("Server running on port 4000")
    dbConnect(dbUrl)
})