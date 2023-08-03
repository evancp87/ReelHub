import express from 'express';
const router = express.Router();
import  {createUser, login}  from "../controllers/user.controller";


router.post("/new", createUser)
router.post("/login", login)
// Router.delete("/new", createUser)
// Router.patch("/new", createUser)


export default router;