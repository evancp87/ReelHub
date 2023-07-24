
import {Media} from "../models/users.model";
import {Request, Response} from "express";

export async function bookmarkContent(req:Request, res:Response):Promise<void> {
try {
  
  await newUser.save()
  res.json(newUser);
} catch (error) {
  console.log("There was an error:", error);
}

}


export async function getMedia(req:Request, res:Response):Promise<void> {
  try {
    const {name, email, password} = req.body;
    
   
  } catch (error) {
    console.log("There was an error:", error);
  }
  
  }

  export async function deleteUser(req:Request, res:Response):Promise<void> {
    try {
      const {name, email, password} = req.body;
      
      const user =  await  User.find();
     
    } catch (error) {
      console.log("There was an error:", error);
    }
    
    }

    export async function updateUser(req:Request, res:Response):Promise<void> {
      try {
        const {name, email, password} = req.body;
        
        const user =  await  User.find();
       
      } catch (error) {
        console.log("There was an error:", error);
      }
      
      }
  


