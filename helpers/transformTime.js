const moment = require("moment");

module.exports = (dateString) => {
    let date = moment(dateString);
    return date.utc().format("YYYY-MM-DD")
}