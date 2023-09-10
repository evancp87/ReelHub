import jwt from "jsonwebtoken";
require("dotenv").config();
import {Request, Response, NextFunction} from "express";
const secretKey = process.env.JWT_SECRET_KEY!;

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

// const verifyToken = (req:AuthenticatedRequest, res:Response, next: NextFunction)  => {
//   const token = req.headers.authorization!;

//   if (!token) {
//     res.status(403).json({error: "error, you are not authorized"});
//   }
//   jwt.verify(token, secretKey, (error, decoded) => {
// if (error) {
//   res.status(401).json({error: "Unauthorized"})
// }
// req.user = decoded;
// next();
//   })
// }

// export default verifyToken;