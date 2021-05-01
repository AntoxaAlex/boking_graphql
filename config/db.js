const mongoose = require("mongoose")

const dbConnect = async (dbUrl)=>{
    try {
        await mongoose.connect(dbUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Database has been successfully connected")
    }catch (e) {
        console.log('DB did not connected: ' + e.message);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = dbConnect