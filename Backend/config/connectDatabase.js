const mongoose = require('mongoose');

const connectDatabase = () => {
    const DB_URI = process.env.MONGODB_URI || process.env.DB_LEARNING || 'mongodb://localhost:27017/learning';
    
    mongoose.connect(DB_URI)
    .then(con => {
        console.log(`MongoDB connected: ${con.connection.host}`);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });
}

module.exports = connectDatabase;