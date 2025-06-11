import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


const mongoConnect = async () =>{
    await mongoose.connect(
        `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ) 
}

export default mongoConnect;