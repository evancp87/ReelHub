import express from 'express';
const router = express.Router();
import  {createUser, login, userDetails}  from "../controllers/user.controller";


router.post("/new", createUser)
router.post("/login", login)
router.get("/user/:email", userDetails)
// Router.delete("/new", createUser)
// Router.patch("/new", createUser)


export default router;