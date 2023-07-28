"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
var mongoose_1 = require("mongoose");
var mediaSchema = new mongoose_1.Schema({
    trending: {
        small: { type: String, required: true },
        large: { type: String, required: true },
    },
    regular: {
        small: { type: String, required: true },
        medium: { type: String, required: true },
        large: { type: String, required: true },
    },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: String, required: true },
    isBookmarked: { type: Boolean, required: true },
    isTrending: { type: Boolean, required: true },
});
exports.Media = (0, mongoose_1.model)('Media', mediaSchema);
