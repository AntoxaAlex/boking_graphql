const express = require("express");
const app = express();
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

//Import env variables
const port = process.env.PORT;
const dbUrl = process.env.DBURL;

//Set mongoDB
const dbConnect = require("./config/db")

//Import middleware function that takes incoming request and funnel through graphql parser
const {graphqlHTTP} = require("express-graphql");

const mySchema = require("./schema/index")
const myResolvers = require("./resolvers/index")

app.use(bodyParser.json());
app.use("/graphql",graphqlHTTP({
    //Valid graphql schema
    schema: mySchema,
    //JS object contains all resolver functions
    rootValue: myResolvers,
    graphiql: true
}));

app.listen(port,()=>{
    console.log("Server running");
    dbConnect(dbUrl)
});