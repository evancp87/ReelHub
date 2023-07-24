"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import path from "path";
var app = (0, express_1.default)();
var cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: false }));
require('dotenv').config();
var PORT = process.env.PORT || 6002;
var source = process.env.MONGO_SOURCE;
// app.use("/users", require("./controllers/"))
app.listen(PORT, function () {
    console.log("server listening of port ".concat(PORT));
});
