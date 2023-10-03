import express from 'express';
const router = express.Router();
import {addBookmark, getBookmarksByUser, getBookmarksByCategoryOnUser} from '../controllers/bookmarks.controller';

router.put("/add", addBookmark);
router.get("/:userId", getBookmarksByUser);
router.get("/:category/:userId", getBookmarksByCategoryOnUser);


export default router;
