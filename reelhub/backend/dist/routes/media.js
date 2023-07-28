"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var media_controller_1 = require("../controllers/media.controller");
router.post("/add", media_controller_1.addMedia);
// Router.get("/new", createUser)
// Router.delete("/new", createUser)
// Router.patch("/new", createUser)
exports.default = router;
