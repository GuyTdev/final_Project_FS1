import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async(uri) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('app is connected to mongoDB'))
    .catch( err => console.log(err) )
}

export default connectDB