"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_controller_1 = require("../controllers/user.controller");
router.post("/new", user_controller_1.createUser);
router.post("/login", user_controller_1.login);
// Router.delete("/new", createUser)
// Router.patch("/new", createUser)
exports.default = router;
