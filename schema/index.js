//buildSchema function generate graphql schema through converting string to object
const {buildSchema} = require("graphql")

const schema = buildSchema(`
        schema {
            query: RootQuery
            mutation: RootMutation
        }
        
        type RootQuery {
            events: [Event!]!
            user(id:String!): User!
            bookings: [Booking!]!
        }
        
        type RootMutation {
            createEvent(eventInput: EventInput): [Event!]
            editEvent(eventId: ID!, eventInput: EventInput) : [Event!]
            deleteEvent(eventId: ID!) : [Event!]
            register(registerInput: UserInput): User
            login(email:String!,password: String!): AuthData
            bookEvent(eventId: ID!): [Event!]
            cancelBooking(eventId: ID!): [Event!]
        }
        
        type Event {
            _id: ID!
            title: String!
            imageUrl: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
            bookings: [Booking!]
        }
        
        input EventInput {
            title: String!
            imageUrl: String!
            description: String!
            price: Float!
            date: String!
        }
        
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }
        
        type User {
            _id: ID!
            firstname: String!
            secondname: String!
            email: String!
            password: String
            createdEvents: [Event!]
            bookings: [Booking!]
        }
        
        input UserInput {
            firstname: String!
            secondname: String!
            email: String!
            password: String!
        }
        
        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }
    `)

module.exports = schema;