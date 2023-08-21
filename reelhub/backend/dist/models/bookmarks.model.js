"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
var mongoose_1 = require("mongoose");
var bookmarkSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    media: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Media', required: true },
    //   category: { type: String, required: true },
    bookmarkedAt: { type: Date, default: Date.now },
});
var Bookmark = (0, mongoose_1.model)('Bookmark', bookmarkSchema);
exports.Bookmark = Bookmark;
