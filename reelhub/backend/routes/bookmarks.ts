const express = require('express');
const router = express.Router();

import {addBookmark, getBookmarksByUser, removeBookmark, getBookmarksByCategoryOnUser} from '../controllers/bookmarks.controller';

router.post("/add", addBookmark);
router.get("/:userId", getBookmarksByUser);
router.get("/:category/:userId", getBookmarksByCategoryOnUser);
router.delete("/delete", removeBookmark)


export default router;
