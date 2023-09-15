
import { User } from "../models/users.model";
import dotenv  from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config()
import bcrypt from "bcrypt";
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET_KEY!;
// const ,} = require( "express");
import {Request, Response} from "express";

 export async function createUser(req:Request, res:Response):Promise<void> {
try {
  console.log("createUser route ran");
  const {firstName, lastName, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser =  new User({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

 // const token = jwt.sign(
    //   { email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   },
    //   (err, token) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     res.send(token);
    //   }
    // );

  await newUser.save()
  res.json(newUser);
} catch (error) {
  console.log("There was an error:", error);
  res.sendStatus(500).json({error: "Failed to create a user"});
}

}



export async function login(req: Request, res: Response): Promise<void> {
  console.log("login route ran");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Please check your login credentials and try again" });
      return;
    }

    const userToFind = await User.findOne({ email });

    if (!userToFind) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    console.log(userToFind)

    // Compare the provided password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(password, userToFind.password);
    const token = jwt.sign(
      { _id: userToFind._id, email: userToFind.email },
      jwtSecret,
      { expiresIn: "2h" }
    );

    console.log(token)

    if (!matchedPassword) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    // Password is correct, login successful
    res.status(200).json({token, userToFind});


  } catch (error) {
    console.error("There was an error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export async function userDetails(req: Request, res: Response): Promise<void> {
try {
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const userToFind = await User.findOne({ email });

  if (!userToFind) {
    res.status(404).json({ error: "User not found" });
    return;
  }


  res.status(200).json(userToFind);

} catch (error) {
  console.error("There was an error:", error);
  res.status(500).json({ error: "Internal Server Error" });
}

}



