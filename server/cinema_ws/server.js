import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import connectDB from "../cinema_ws/mongodb/connectDB.js";
import authRouter from './routes/authRoutes.js'
import usersRouter from './routes/usersRoutes.js'
// import membersRouter from './routes/membersRoutes.js'
// import moviesRouter from './routes/moviesRoutes.js'
import subscriptionsWS_Router from './routes/subscriptionsWS_Routes.js'

dotenv.config();
const app = express();
//Middleware
app.use(express.json());
//My data (could be store anywhere you want)
const users = [
  { username: "Guy", password: "p@ssword1" },
  { username: "Jecka", password: "p@ssword2" },
];
//simple geting the data without auth middleware:
/**
 app.get('/posts',(req,res)=>{
     res.send(posts)
 })
 * 
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.header("authorization"); //OR req.headers['authorization']
  console.log("authHeader", authHeader);
  const token = authHeader?.split(" ")[1];
  console.log("token in authenticate", token);
  if (!token) {
    return res.status(401).json("no username to validate");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.status(403).json("user is unauthorized");
    req.user = data;
    console.log("data after verify:", data);
    next();
  });
};

//Main Routes

app.use('/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/subscriptions_ws', subscriptionsWS_Router)

app.get("/users", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});
app.post("/login", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const jsonTypeUser = { name: username };
  console.log("jsonTypeUser:", jsonTypeUser);
  //confirm that username exist in users WS
  if (true) {
    //if user exist
    const access_token = jwt.sign(
      jsonTypeUser,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "35s" }
    );
    console.log(access_token);
    res.json({ access_token });
  } else {
    res.status(404).json("user not exist in ws");
  }
});

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