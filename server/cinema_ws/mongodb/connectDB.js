import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();
//connect to mongoDB=>usersDB
const connectDB = async(uri) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`app is connected to mongoDB ->${process.env.MONGO_DATABASE_NAME}`))
    .catch( err => console.log(err) )
}

export default connectDB