import mongoose from 'mongoose';
import { config } from '../config.js'; // Ensure the file extension is included

export async function connectDb() {
    try {
        await mongoose.connect(config.db.dbHost, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...');
        // Implement reconnection logic if desired
    });
}
