import dotenv from "dotenv";
import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import * as firstFetchBLL from './firstTimeFetchService/main_BLL.js'
import moviesRouter from './routes/moviesRoutes.js'
import membersRouter from './routes/membersRoutes.js'
import subscriptionsRouter from './routes/subscriptionsRoutes.js'
import connectDB from "./mongodb/connectDB.js";



dotenv.config();
const app = express();
//Middleware
app.use(express.json());
app.use(cors());



//Main Routes
app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscriptions', subscriptionsRouter)



 const PORT = process.env.PORT || 4001;
 const URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xne0r.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;
 const startServer =async () =>{
    try{

        await connectDB(URI);
        app.listen(PORT, () => console.log(`subscriptions server is running on port ${PORT}`))
        //Pull data from external Movies_ws and Members_ws and populate into mongo subscriptionsDB relevant collections
        const resp = await firstFetchBLL.fistFetchMembersAndMoviesFromWSIntoDB();
        console.log(resp);
    }catch(error){
        console.log(error);
    }
 }
 startServer();
