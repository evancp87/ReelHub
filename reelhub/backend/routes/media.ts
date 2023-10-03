import express from 'express';
const router = express.Router();
import  {addMedia, getContent, getTrending, getCategory, getBookmarkedMedia}  from "../controllers/media.controller";
import checkToken from '../middleware/tokens';

router.post("/add", addMedia)
router.get("/", getContent)
router.get("/trending", getTrending)
router.get("/category/:category", getCategory)
router.get("/bookmarks/:category", checkToken, getBookmarkedMedia)

export default router;