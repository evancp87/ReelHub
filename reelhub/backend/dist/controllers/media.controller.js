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
exports.addMedia = exports.getBookmarkedMedia = exports.getCategory = exports.getTv = exports.getTrending = exports.getContent = void 0;
// const Media = require("../models/users.model");
var media_model_1 = require("../models/media.model");
function getContent(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, media_model_1.Media.find({})];
                case 1:
                    results = _a.sent();
                    res.status(200).json(results);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(404).json("no results found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getContent = getContent;
function getTrending(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, media_model_1.Media.find({ isTrending: true })];
                case 1:
                    results = _a.sent();
                    res.status(200).json(results);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(404).json("no results found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getTrending = getTrending;
function getTv(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, media_model_1.Media.find({ isTrending: true })];
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
exports.getTv = getTv;
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var category, results, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    category = req.params.category;
                    console.log(category);
                    return [4 /*yield*/, media_model_1.Media.find({ category: "".concat(category) })];
                case 1:
                    results = _a.sent();
                    res.status(200).json(results);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(404).json("no results found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCategory = getCategory;
function getBookmarkedMedia(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var category, results, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    category = req.params.category;
                    console.log(category);
                    return [4 /*yield*/, media_model_1.Media.find({ isBookmarked: true, category: "".concat(category) })];
                case 1:
                    results = _a.sent();
                    res.status(200).json(results);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(404).json("no results found");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getBookmarkedMedia = getBookmarkedMedia;
function addMedia(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, _b, 
        // trending: { small: trendingSmall, large: trendingLarge },
        // regular: { small: regularSmall, medium: regularMedium, large: regularLarge },
        trending, regular, year, category, rating, isBookmarked, isTrending, contentItem, error_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.body, title = _a.title, _b = _a.thumbnail, trending = _b.trending, regular = _b.regular, year = _a.year, category = _a.category, rating = _a.rating, isBookmarked = _a.isBookmarked, isTrending = _a.isTrending;
                    console.log(req.body);
                    contentItem = new media_model_1.Media({
                        title: title,
                        thumbnail: {
                            trending: {
                                small: (trending === null || trending === void 0 ? void 0 : trending.small) || null,
                                large: (trending === null || trending === void 0 ? void 0 : trending.large) || null,
                            },
                            regular: {
                                small: regular.small,
                                medium: regular.medium,
                                large: regular.large,
                            },
                        },
                        year: year,
                        category: category,
                        rating: rating,
                        isBookmarked: isBookmarked,
                        isTrending: isTrending,
                    }, {
                        //  default value for optional trending property
                        default: { trending: undefined },
                    });
                    return [4 /*yield*/, contentItem.save()];
                case 1:
                    _c.sent();
                    res.status(200).json(contentItem);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _c.sent();
                    console.log("There was an error:", error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addMedia = addMedia;
//   export async function deleteUser(req:Request, res:Response):Promise<void> {
//     try {
//       const {name, email, password} = req.body;
//       const user =  await  User.find();
//     } catch (error) {
//       console.log("There was an error:", error);
//     }
//     }
//     export async function updateUser(req:Request, res:Response):Promise<void> {
//       try {
//         const {name, email, password} = req.body;
//         const user =  await  User.find();
//       } catch (error) {
//         console.log("There was an error:", error);
//       }
//       }
