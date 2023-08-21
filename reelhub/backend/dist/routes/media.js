"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var media_controller_1 = require("../controllers/media.controller");
var tokens_1 = __importDefault(require("../middleware/tokens"));
router.post("/add", media_controller_1.addMedia);
router.get("/", media_controller_1.getContent);
router.get("/trending", media_controller_1.getTrending);
router.get("/category/:category", tokens_1.default, media_controller_1.getCategory);
router.get("/bookmarks/:category", tokens_1.default, media_controller_1.getBookmarkedMedia);
// Router.patch("/new", createUser)
exports.default = router;
