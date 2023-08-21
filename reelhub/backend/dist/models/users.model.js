"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // bookmarks: {type:  Schema.Types.Mixed, ref: "Bookmark"}
});
// House.find({}).populate("owner")
// for relational
// types.objectId
// https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc
var User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
