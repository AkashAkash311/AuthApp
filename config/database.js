
const mongoose = require("mongoose");
require("dotenv").config()

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser : true, 
        useUnifiedTopology:true
    })
    .then(()=> {
        console.log("Connection ho gye bete")
    })
    .catch((err) =>{
        console.log("Connection Issues with Database");
        process.exit(1);
    })
}