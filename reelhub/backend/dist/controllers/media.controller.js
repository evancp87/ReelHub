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
exports.addMedia = void 0;
// const Media = require("../models/users.model");
var media_model_1 = require("../models/media.model");
// export async function getContent(req:Request, res:Response):Promise<void> {
//   Media.find({},(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 
//     res.status(200).json(results);
//   })
// }
// export async function getTrending(req:Request, res:Response):Promise<void> {
//   Media.find({trending: true },(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 
//     res.status(200).json(results);
//   })
// }
// export async function getTrending(req:Request, res:Response):Promise<void> {
//   Media.find({trending: true,  },(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 
//     res.status(200).json(results);
//   })
// }
// export async function getBookmarked(req:Request, res:Response):Promise<void> {
//   Media.find({isBookmarked: true, category: `${category}` },(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 
//     res.status(200).json(results);
//   })
// }
// export async function getREcommended(req:Request, res:Response):Promise<void> {
// find user
// find likes
// const likedContentIds = user.likedContent.map((content) => content._id);
// Find recommended content that other users have liked
// const recommendedContent = await Content.find({
//   _id: { $nin: likedContentIds },
// }).limit(5); // Adjust the number of recommendations as needed
// res.json(recommendedContent);
// }
function addMedia(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, _b, _c, trendingSmall, trendingLarge, _d, regularSmall, regularMedium, regularLarge, year, category, rating, isBookmarked, isTrending, contentItem, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    _a = req.body, title = _a.title, _b = _a.thumbnail, _c = _b.trending, trendingSmall = _c.small, trendingLarge = _c.large, _d = _b.regular, regularSmall = _d.small, regularMedium = _d.medium, regularLarge = _d.large, year = _a.year, category = _a.category, rating = _a.rating, isBookmarked = _a.isBookmarked, isTrending = _a.isTrending;
                    contentItem = new media_model_1.Media({
                        title: title,
                        thumbnail: {
                            trending: {
                                small: trendingSmall,
                                large: trendingLarge,
                            },
                            regular: {
                                small: regularSmall,
                                medium: regularMedium,
                                large: regularLarge,
                            },
                        },
                        year: year,
                        category: category,
                        rating: rating,
                        isBookmarked: isBookmarked,
                        isTrending: isTrending,
                    });
                    return [4 /*yield*/, contentItem.save()];
                case 1:
                    _e.sent();
                    res.status(200).json(contentItem);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _e.sent();
                    console.log("There was an error:", error_1);
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
