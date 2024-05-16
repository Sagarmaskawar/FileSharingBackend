

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DbConnection = async () => {
    // const MongoURL = `mongodb+srv://Abhishek:Abhishek1234@abhishek.zwylwnu.mongodb.net/?retryWrites=true&w=majority&appName=Abhishek`;
//   const MongoURL =`mongodb+srv://Adi:Adi1234@adi.xz9iatt.mongodb.net/?retryWrites=true&w=majority&appName=Adi`
const MongoURL =`mongodb+srv://Adi:Adi1234@adi.xz9iatt.mongodb.net/?retryWrites=true&w=majority&appName=Adi`;
    try {
        await mongoose.connect(MongoURL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting', error);
    }
};

export default DbConnection; 