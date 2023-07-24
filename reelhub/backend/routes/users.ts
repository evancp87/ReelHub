import express from 'express';
const Router = express.Router();
import { createUser } from "../controllers/user.controller";


Router.post("/new", createUser)
// Router.get("/new", createUser)
// Router.delete("/new", createUser)
// Router.patch("/new", createUser)


module.exports = Router;