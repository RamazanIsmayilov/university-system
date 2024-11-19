const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ismayiloff522:ramazan522@shop.epoxx.mongodb.net/?retryWrites=true&w=majority&appName=Shop')
        console.log('MongoDb successfully connected');
    } catch (error) {
        console.log('Error connecting to MongoDb', error);
    }
}

module.exports = connectDB