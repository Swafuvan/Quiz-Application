'use server'
import mongoose from 'mongoose';

export async function connectDB(){
    try {
        await mongoose.connect(process.env.MongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:',error.message);
    }
}
