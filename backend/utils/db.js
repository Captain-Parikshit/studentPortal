const mongoose = require('mongoose');

const connectDB= async () =>{
    try {
        console.log("inside mongo ");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }catch (error) {
        console.log(error);
    }
}


module.exports = connectDB;