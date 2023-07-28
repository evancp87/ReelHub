import express from 'express';
const router = express.Router();
import  {addMedia}  from "../controllers/media.controller";


router.post("/add", addMedia)
// Router.get("/new", createUser)
// Router.delete("/new", createUser)
// Router.patch("/new", createUser)

export default router;