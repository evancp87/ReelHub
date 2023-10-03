import express from 'express';
const router = express.Router();
import  {createUser, login, userDetails}  from "../controllers/user.controller";


router.post("/new", createUser)
router.post("/login", login)
router.get("/user/:email", userDetails)


export default router;