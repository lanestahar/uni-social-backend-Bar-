require('dotenv').config();
const mongoose = require('mongoose');

/*if (process.env.NODE_ENV !== "production") {
    import config from 'dotenv';
}*/

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,  
        }); 
    } catch (err) {
        console.error(err);
    }
}

module.exports = {connectDB}