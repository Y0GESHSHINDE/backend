require('dotenv').config();  // Load environment variables

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("🔍 MongoDB URI:", process.env.MONGO_URI);  // Debugging

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is undefined! Check your .env file.");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
