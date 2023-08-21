"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookmarksByUser = exports.getBookmarksByCategoryOnUser = exports.removeBookmark = exports.addBookmark = void 0;
// const Media = require("../models/users.model");
var media_model_1 = require("../models/media.model");
var users_model_1 = require("../models/users.model");
var bookmarks_model_1 = require("../models/bookmarks.model");
function addBookmark(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, mediaId, userId, mediaToBookmark, newBookmark, user, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, mediaId = _a.mediaId, userId = _a.userId;
                    console.log("The media is:", mediaId, "and the user is:", userId);
                    return [4 /*yield*/, media_model_1.Media.findOne({ _id: mediaId })];
                case 1:
                    mediaToBookmark = _b.sent();
                    console.log(mediaToBookmark);
                    if (!mediaToBookmark) {
                        res.status(404).json("no content to bookmark specified");
                        return [2 /*return*/];
                    }
                    if (mediaToBookmark.isBookmarked) {
                        res.send("already bookmarked!");
                        return [2 /*return*/];
                    }
                    newBookmark = new bookmarks_model_1.Bookmark({ media: mediaId, user: userId });
                    return [4 /*yield*/, newBookmark.save()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, users_model_1.User.findOne({ _id: userId })];
                case 3:
                    user = _b.sent();
                    mediaToBookmark.isBookmarked = true;
                    console.log("The new bookmark is:", newBookmark);
                    console.log("the user is:", user);
                    if (!user) {
                        res.status(404).json("user not found");
                        return [2 /*return*/];
                    }
                    //   user.bookmarks.push(newBookmark._id); 
                    return [4 /*yield*/, user.save()];
                case 4:
                    //   user.bookmarks.push(newBookmark._id); 
                    _b.sent();
                    res.status(200).send("bookmark added successfully");
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    res.status(500).json("error while adding bookmark");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addBookmark = addBookmark;
function removeBookmark(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, mediaId, userId, mediaToRemove, user, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, mediaId = _a.mediaId, userId = _a.userId;
                    console.log("The media is:", mediaId, "and the user is:", userId);
                    return [4 /*yield*/, media_model_1.Media.findOne({ _id: mediaId })];
                case 1:
                    mediaToRemove = _b.sent();
                    return [4 /*yield*/, users_model_1.User.findOne({ _id: userId })];
                case 2:
                    user = _b.sent();
                    console.log(mediaToRemove);
                    if (!mediaToRemove) {
                        res.status(404).json("no content to remove from bookmarks");
                        return [2 /*return*/];
                    }
                    //   if (!mediaToRemove.isBookmarked) {
                    //       res.status(404).json("That content is not in your bookmarks")
                    //       return;
                    //   }
                    if (!user) {
                        res.status(404).send("can't find that user");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bookmarks_model_1.Bookmark.collection.findOneAndDelete({ media: mediaToRemove })];
                case 3:
                    _b.sent();
                    mediaToRemove.isBookmarked = false;
                    //   const index = user.bookmarks.findIndex(bookmark => bookmark._id === mediaId);
                    //   user.bookmarks.splice(index);
                    return [4 /*yield*/, user.save()];
                case 4:
                    //   const index = user.bookmarks.findIndex(bookmark => bookmark._id === mediaId);
                    //   user.bookmarks.splice(index);
                    _b.sent();
                    res.status(200).send("bookmark added successfully");
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _b.sent();
                    res.status(404).json("no results found");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.removeBookmark = removeBookmark;
function getBookmarksByCategoryOnUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var category, userId, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    category = req.params.category;
                    userId = req.params.userId;
                    if (!userId) {
                        res.send(404).json("couldn't find user");
                        return [2 /*return*/];
                    }
                    // TODO handle if there are no bookmarks under that category
                    if (!category) {
                        res.send(404).json("couldn't find the category");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bookmarks_model_1.Bookmark.find({ user: userId }).populate({ path: 'media', match: { category: "".concat(category) } })
                        // const filteredResults = results.filter(bookmark => bookmark.category.category !== null);
                    ];
                case 1:
                    results = _a.sent();
                    // const filteredResults = results.filter(bookmark => bookmark.category.category !== null);
                    res.status(200).json(results);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBookmarksByCategoryOnUser = getBookmarksByCategoryOnUser;
// Finds all bookmarks under a user regardless of category, for querying and filtering in frontend
function getBookmarksByUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var category, userId, results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("i ran!");
                    category = req.params.category;
                    userId = req.params.userId;
                    console.log(category);
                    return [4 /*yield*/, bookmarks_model_1.Bookmark.find({ user: userId }).populate({ path: 'media' })];
                case 1:
                    results = _a.sent();
                    res.status(200).json(results);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(404).json("no results found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBookmarksByUser = getBookmarksByUser;
