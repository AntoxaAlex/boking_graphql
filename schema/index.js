//buildSchema function generate graphql schema through converting string to object
const {buildSchema} = require("graphql")

const schema = buildSchema(`
        type Event {
            _id: ID!
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
            creator: String!
        }
        
        input UserInput {
            firstname: String!
            secondname: String!
            email: String!
            password: String!
        }
        
        type User {
            _id: ID!
            firstname: String!
            secondname: String!
            email: String!
            password: String
            createdEvents: [Event!]
        }
        
        type RootQuery {
            events: [Event!]!
            user(id:String!): User!
        }
        
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            register(registerInput: UserInput): User
            login(email:String!,password: String!): User
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)

module.exports = schema;