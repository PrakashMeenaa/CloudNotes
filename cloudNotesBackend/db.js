const mongoose = require("mongoose");
const mongoURI ="mongodb://localhost:27017/admin"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo 