const authResolvers = require("../resolvers/auth");
const bookingsResolvers = require("../resolvers/bookings");
const eventsResolvers = require("../resolvers/events");


module.exports = {
    ...authResolvers,
    ...bookingsResolvers,
    ...eventsResolvers
}