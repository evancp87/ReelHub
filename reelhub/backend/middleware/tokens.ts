const jwt = require("jsonwebtoken");
require("dotenv").config();
import {Request, Response, NextFunction} from "express";

interface AuthenticatedRequest extends Request  {
    token?: string
}
const checkToken = (req:AuthenticatedRequest, res:Response, next: NextFunction) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

export default checkToken;