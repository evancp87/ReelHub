const express = require('express');
const router = express.Router();

import {addBookmark, getBookmarksByCategory, removeBookmark} from '../controllers/bookmarks.controller';

router.post("/add", addBookmark);
router.get("/:category", getBookmarksByCategory);
router.delete("/delete", removeBookmark)


export default router;
