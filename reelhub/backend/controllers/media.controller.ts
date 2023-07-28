
// const Media = require("../models/users.model");
import {Media} from "../models/media.model";
import {Request, Response} from "express";





// export async function getContent(req:Request, res:Response):Promise<void> {
 
//   Media.find({},(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 

//     res.status(200).json(results);
//   })

// }


// export async function getTrending(req:Request, res:Response):Promise<void> {
 
//   Media.find({trending: true },(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 

//     res.status(200).json(results);
//   })

// }


// export async function getTrending(req:Request, res:Response):Promise<void> {
 
//   Media.find({trending: true,  },(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 

//     res.status(200).json(results);
//   })

// }

// export async function getBookmarked(req:Request, res:Response):Promise<void> {
 

//   Media.find({isBookmarked: true, category: `${category}` },(err, results) =>  {
//     if (err) {
//       res.status(404).json("no results found");
//       return;
//     } 

//     res.status(200).json(results);
//   })

// }

// export async function getREcommended(req:Request, res:Response):Promise<void> {
 
// find user
// find likes
// const likedContentIds = user.likedContent.map((content) => content._id);

    // Find recommended content that other users have liked
    // const recommendedContent = await Content.find({
    //   _id: { $nin: likedContentIds },
    // }).limit(5); // Adjust the number of recommendations as needed

    // res.json(recommendedContent);
// }

  export async function addMedia(req:Request, res:Response):Promise<void> {
    try {
      const {
        title,
        thumbnail: {
          trending: { small: trendingSmall, large: trendingLarge },
          regular: { small: regularSmall, medium: regularMedium, large: regularLarge },
        },
        year,
        category,
        rating,
        isBookmarked,
        isTrending,
      } = req.body;
  
      const contentItem = new Media({
        title,
        thumbnail: {
          trending: {
            small: trendingSmall,
            large: trendingLarge,
          },
          regular: {
            small: regularSmall,
            medium: regularMedium,
            large: regularLarge,
          },
        },
        year,
        category,
        rating,
        isBookmarked,
        isTrending,
      });
  
  
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
  


