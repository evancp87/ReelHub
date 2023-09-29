
import { User } from "../models/users.model";
import dotenv  from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";
import multerS3 from "multer-s3"
import bcrypt from "bcrypt";
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET_KEY as string;
import cloudinary from "../cloudinary";
// const jwtSecret = process.env.JWT_SECRET_KEY!;

import {Request, Response} from "express";
import {upload} from "../aws-config";

import joi from "joi"; 

// const schema = joi.object({
//   firstName: joi.string().min(1).max(50),
//   lastName: joi.string().min(1).max(50),
//   email: joi.string().email().required(),
//   password: joi.string().min(5).max(40).regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/).required(),
// });

console.log("checking the user schema", User);



interface CustomFile extends Express.Multer.File {
  location?: string;
}

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    console.log("createUser route ran");
 
    const { firstName, lastName, email, password, avatar } = req.body;
    
    // const { firstName, lastName, email, password } = req.body;
    
    // let avatar: string | undefined; 

    let uploadedImageId;
    let uploadedImageUrl: string | undefined;

    if (avatar) {
      const uploadedImage = await cloudinary.uploader.upload(avatar, {
          upload_preset: 'urhoa0lz',
          allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
      });
  
      // Assign the public_id after the image has been uploaded
      uploadedImageId = uploadedImage.public_id;
      uploadedImageUrl = uploadedImage.url;
      
      try {
                console.log(uploadedImage)
            } catch (err) {
                console.log(err)
    
            }
  }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

let newUser
      if (uploadedImageUrl) {
   newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    avatar: uploadedImageUrl, 
  });


} else {
  newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  console.log("checking if there's this one is runngin without avatar", newUser)

}
     

      const duplicateUser = await User.findOne({ email });

      if (duplicateUser) {
        res.status(401).send("There is already a user with this email address");
        return;
      }

        // Validate the request body against the schema
    
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
  res.status(200).json({newUser, message: "user created successfully"});
} catch (error) {
  console.log("There was an error:", error);
  res.status(500).json({error: "Failed to create a user"});
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



