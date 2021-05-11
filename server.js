const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const isAuth = require("./middleware/auth");

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

//Import created schema and resolvers
const mySchema = require("./schema/index")
const myResolvers = require("./resolvers/index")

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth)
//Graphql middleware
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