const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
             {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`MongoDB Connected`);
    } catch (err) {
        console.log(`For some reasons we couldn't connect to the DB`.red, err);
    }
}
module.exports = connectDB;