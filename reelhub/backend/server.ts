
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


app.use(cors({
    origin:  'http://localhost:3000',
    credentials: true, 
  }))


// sets file size limit, to ensure uploads can work - cloudinary
app.use(express.json({limit: '50mb'}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const PORT = process.env.PORT || 6002;
const source:string = process.env.MONGO_SOURCE!

mongoose.connect(`${source}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const connectDB = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const conn = await mongoose.connect(source);
        console.log(`Mongo db connected`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB();


app.use("/users",  userRouter);
app.use("/media", mediaRouter);
app.use("/bookmarks", checkToken, bookmarksRouter)


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
    
})