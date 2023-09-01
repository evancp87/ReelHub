
// export {};
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv  from "dotenv"
import userRouter from "./routes/users"
import mediaRouter from "./routes/media"
import bookmarksRouter from "./routes/bookmarks";
import mongoose from "mongoose";
import checkToken from "./middleware/tokens";
const app = express();
app.use(helmet());
dotenv.config()
app.use(cors());


const options = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST',
  }

// app.use(cors({
//     origin: 'http://localhost:3000', 
//     credentials: true,
//   }));

  app.use(cors(options));
//   app.options('http://localhost:3000', cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));



app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 6002;

const source:string = process.env.MONGO_SOURCE!

mongoose.connect(`${source}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(source);
        console.log(`Mongo db connected`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB();
// mongoose.connect(`${source}`);



app.use("/users",  userRouter);
app.use("/media", mediaRouter);
app.use("/bookmarks", checkToken, bookmarksRouter)


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
    
})