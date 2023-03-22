import dotenv from "dotenv";
import express from "express";
import connectDB from "../cinema_ws/mongodb/connectDB.js";
import authRouter from './routes/authRoutes.js'
import usersRouter from './routes/usersRoutes.js'
import cors from 'cors'
// import membersRouter from './routes/membersRoutes.js'
// import moviesRouter from './routes/moviesRoutes.js'
import subscriptionsWS_Router from './routes/subscriptionsWS_Routes.js'

dotenv.config();
const app = express();
//Middleware
app.use(express.json());
app.use(cors());

//Main Routes
app.use('',()=> console.log("hello from cinema server"))
app.use('/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/subscriptions_ws', subscriptionsWS_Router)

const PORT = process.env.PORT || 3001;

const URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xne0r.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;
 const startServer =async () =>{
    try{
        await connectDB(URI);
        app.listen(PORT, () => console.log(`jwt server is running on port ${PORT}`))
    }catch(error){
        console.log(error);
    }
 }
 startServer();