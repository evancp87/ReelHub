
// const Media = require("../models/users.model");
import {Media} from "../models/media.model";
import {User, IUser} from "../models/users.model";
import {Bookmark} from "../models/bookmarks.model";
import {Request, Response} from "express";

export async function addBookmark(req: Request, res: Response): Promise<void> {
    try {
      const { mediaId, userId } = req.body;
  
      console.log("for adding, The media is:", mediaId, "and the user is:", userId);
  
      const mediaToBookmark = await Media.findOne({ _id: mediaId });
  
      console.log(mediaToBookmark);
  
      if (!mediaToBookmark) {
        res.status(404).json("no content to bookmark specified");
        return;
      }

      
  // const alreadyExists = await Bookmark.findOne({id:mediaId, user: userId})

  // console.log("checking if it exists", alreadyExists)
  // if (alreadyExists) {
  //       res.send("already bookmarked!");
  //       return;
  //     }
      let bookmark = await Bookmark.findOne({media: mediaId, user: userId});

      if (bookmark) {
          // If the bookmark exists, remove it
          console.log("bookmark deleted")
          await Bookmark.deleteOne({ _id: bookmark._id });
          // res.status(200).send("bookmark removed successfully");
      } else {
          // If the bookmark does not exist, create it
          console.log("bookmark added")

          bookmark = new Bookmark({ media: mediaId, user: userId }); 
          await bookmark.save(); 
          // res.status(200).send("bookmark added successfully");
      }
      
      // const newBookmark = new Bookmark({ media: mediaId, user: userId }); 
      // await newBookmark.save(); 
      const user = await User.findOne({ _id: userId });
  
      // mediaToBookmark.isBookmarked = true;
  
      console.log("The new bookmark is:", bookmark);
      console.log("the user is:", user);
  
      if (!user) {
        res.status(404).json("user not found");
        return;
      }
  
    //   user.bookmarks.push(newBookmark._id); 
      await user.save();
      res.status(200).send("bookmark operation completed successfully");
    } catch (err) {
      res.status(500).json("error while adding bookmark");
    }
  }
  


export async function removeBookmark(req:Request, res:Response):Promise<void> {
    try {
  
      const {mediaId, userId} = req.body;
  
      console.log("for deleting, The media is:", mediaId, "and the user is:", userId);
      
       const mediaToRemove =  await Media.findOne({ _id: mediaId});
       const user = await User.findOne({_id: userId});
  
       console.log(mediaToRemove);
       
  
  if (!mediaToRemove) {
  
      res.status(404).json("no content to remove from bookmarks");
      return;
  }
  
  
//   if (!mediaToRemove.isBookmarked) {
//       res.status(404).json("That content is not in your bookmarks")
//       return;
  
//   }
if  (!user) {
    res.status(404).send("can't find that user");
    return;
}  
     await Bookmark.collection.findOneAndDelete({ media: mediaToRemove});
  
  
       mediaToRemove.isBookmarked = false;
  
      
 
  
  
//   const index = user.bookmarks.findIndex(bookmark => bookmark._id === mediaId);
//   user.bookmarks.splice(index);
  
  
  await user.save();
  res.status(200).send("bookmark added successfully")
    } catch (err) {
      res.status(404).json("no results found");
    }
  }
  


  
  
  
  export async function getBookmarksByCategoryOnUser(req:Request, res:Response):Promise<void> {
      try {
          
          const category = req.params.category;
          const userId = req.params.userId;
          
          if (!userId) {
              res.send(404).json("couldn't find user");
              return;
            }
            // TODO handle if there are no bookmarks under that category
            if (!category) {
                res.send(404).json("couldn't find the category");
                return;
            } 
            // TODO: handle if no records in database yet
            const results: typeof Bookmark[] = await Bookmark.find({user: userId}).populate({path: 'media', match: {category: `${category}`}})
            // const filteredResults = results.filter(bookmark => bookmark.category.category !== null);
            
            res.status(200).json(results);
        } catch (error) {
            
        }
    }
    
    
    // Finds all bookmarks under a user regardless of category, for querying and filtering in frontend
     export async function getBookmarksByUser(req:Request, res:Response):Promise<void> {
      try {
        console.log("i ran!");
        
        // const category = req.params.category;
        const userId = req.params.userId;
    
        // console.log(category);
        
         const results: typeof Bookmark[] = await Bookmark.find({user: userId}).populate({path: 'media'});
    
      res.status(200).json(results);
         
       } catch (error) {
         res.status(404).json("no results found");
        
       }
     
     }