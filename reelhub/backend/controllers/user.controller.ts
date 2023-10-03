
import { User } from "../models/users.model";
import dotenv  from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET_KEY as string;
import cloudinary from "../cloudinary";
import {Request, Response} from "express";
import joi from "joi"; 

// Joi schema for server side validation
const schema = joi.object({
  firstName: joi.string().min(1).max(50),
  lastName: joi.string().min(1).max(50),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
  password: joi.string().min(5).max(40).regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/).messages({
    'string.pattern.base': 'Password must contain at least one number'}).required(),
    avatar: joi.string().allow(null).optional(),
});



export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    // destructure error and value from result of req.body passed into validated schema
const {error, value} = schema.validate(req.body);
 
// sends error if error
if (error) {
  res.status(400).send(error.details[0].message);
  return;
}

const { firstName, lastName, email, password, avatar } = value;

// initialised values for cloudinary image upload
    let uploadedImageId;
    let uploadedImageUrl: string | undefined;

    if (avatar) {
// image sanitisation - allowed formats
      const allowedFormats = ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'];
      const extension = avatar.split(';')[0].split('/').pop().toLowerCase();
      
      if (!allowedFormats.includes(extension)) {
        res.status(400).send(`Invalid file format. Allowed formats: ${allowedFormats.join(', ')}`);
        return;
      }

  //  sets max image file size to be allowed
      const maxFileSizeBytes = 2 * 1024 * 1024; // 2MB
      if (Buffer.byteLength(avatar, 'base64') > maxFileSizeBytes) {
        res.status(400).send('File size exceeds the limit (2MB).');
        return;
      }

// uploads image by making connection, allowed formats again
      const uploadedImage = await cloudinary.uploader.upload(avatar, {
          upload_preset: 'urhoa0lz',
          allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
      });
 
      // Assign the public_id after the image has been uploaded
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      uploadedImageId = uploadedImage.public_id;
      // upload image url for displaying in frontend
      uploadedImageUrl = uploadedImage.url;
      
      try {
                console.log(uploadedImage)
            } catch (err) {
                console.log(err)
    
            }
  }
// hashes password and adds salt rounds
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // if avatar, create user with avatar
let newUser
      if (uploadedImageUrl) {
   newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    avatar: uploadedImageUrl, 
  });
// otherwise creates user without

} else {
  newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

}
     
// check for duplicate user
      const duplicateUser = await User.findOne({ email });

      if (duplicateUser) {
        res.status(401).send("There is already a user with this email address");
        return;
      }

        // Validate the request body against the schema
    
        const token = jwt.sign(
          { _id: newUser._id, email: newUser.email },
          jwtSecret,
          { expiresIn: "2h" }
        );

  await newUser.save()
  res.status(200).json({token, newUser, message: "user created successfully"});
} catch (error) {
  console.log("There was an error:", error);
  res.status(500).json({error: "Failed to create a user"});
}

}



export async function login(req: Request, res: Response): Promise<void> {
 

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

    // Compare the provided password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(password, userToFind.password);
    const token = jwt.sign(
      { _id: userToFind._id, email: userToFind.email },
      jwtSecret,
      { expiresIn: "2h" }
    );


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

// not currently used, but may be in future
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



