"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
require("dotenv").config();
var checkToken = function (req, res, next) {
    var header = req.headers["authorization"];
    if (typeof header !== "undefined") {
        var bearer = header.split(" ");
        var token = bearer[1];
        req.token = token;
        next();
    }
    else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403);
    }
};
exports.default = checkToken;
