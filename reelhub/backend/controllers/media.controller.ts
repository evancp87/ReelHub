
// const Media = require("../models/users.model");
import {Media} from "../models/media.model";
import {Request, Response} from "express";
import { MongoError } from 'mongodb'




export async function getContent(req:Request, res:Response):Promise<void> {
  try {
    const results: typeof Media[] = await Media.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json("no results found");
  }
}

export async function getTrending(req:Request, res:Response):Promise<void> {
 try {
    const results: typeof Media[] = await Media.find({isTrending: true});
 res.status(200).json(results);
    
  } catch (error) {
    res.status(404).json("no results found");
   
  }

}


export async function getTv(req:Request, res:Response):Promise<void> {
  try {
     const results: typeof Media[] = await Media.find({isTrending: true});
  res.status(200).json(results);
     
   } catch (error) {
     res.status(404).json("no results found");
    
   }
 
 }

 export async function getCategory(req:Request, res:Response):Promise<void> {
  try {
    const category = req.params.category;
    console.log(category);
    
     const results: typeof Media[] = await Media.find({category: `${category}`});
  res.status(200).json(results);
     
   } catch (error) {
     res.status(404).json("no results found");
    
   }
 
 }


 export async function getBookmarkedMedia(req:Request, res:Response):Promise<void> {
  try {
    const category = req.params.category;
    console.log(category);
    
     const results: typeof Media[] = await Media.find({isBookmarked: true, category: `${category}`});
  res.status(200).json(results);
     
   } catch (error) {
     res.status(404).json("no results found");
    
   }
 
 }


  export async function addMedia(req:Request, res:Response):Promise<void> {
    try {
      const {
        title,
        thumbnail: {
          // trending: { small: trendingSmall, large: trendingLarge },
          // regular: { small: regularSmall, medium: regularMedium, large: regularLarge },
                 trending, regular,
        },
        year,
        category,
        rating,
        isBookmarked,
        isTrending,
      } = req.body;


    console.log(req.body);
    
      
  
      const contentItem = new Media({
        title,
        thumbnail: {
          trending: {
            small: trending?.small || null,
            large: trending?.large || null,

          },
          regular: {
            small: regular.small,
          medium: regular.medium,
          large: regular.large,
          },
        },
        year,
        category,
        rating,
        isBookmarked,
        isTrending,
      },
      { 
      //  default value for optional trending property
        default: { trending: undefined },}
      );
  
  
      await contentItem.save()
       res.status(200).json(contentItem)
     
  
  
    } catch (error) {
      console.log("There was an error:", error);
    }
    
    }
  


//   export async function deleteUser(req:Request, res:Response):Promise<void> {
//     try {
//       const {name, email, password} = req.body;
      
//       const user =  await  User.find();
     
//     } catch (error) {
//       console.log("There was an error:", error);
//     }
    
//     }

//     export async function updateUser(req:Request, res:Response):Promise<void> {
//       try {
//         const {name, email, password} = req.body;
        
//         const user =  await  User.find();
       
//       } catch (error) {
//         console.log("There was an error:", error);
//       }
      
//       }
  


