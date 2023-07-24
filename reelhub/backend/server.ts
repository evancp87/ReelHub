import express from "express"
// import path from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
require('dotenv').config()

const PORT = process.env.PORT || 6002;


const source:string = process.env.MONGO_SOURCE!

// app.use("/users", require("./controllers/user.controller"))
// app.use("/media", require("./controllers/media.controller"))
// app.use("/media", require("./controllers/bookmarks.controller"))


app.listen(PORT, () => {
    console.log(`server listening of port ${PORT}`);
    
})