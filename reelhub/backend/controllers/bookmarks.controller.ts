
// const Media = require("../models/users.model");
import {Media} from "../models/media.model";
import {User} from "../models/users.model";
import {Bookmark} from "../models/bookmarks.model";
import {Request, Response} from "express";


// adds and removes bookmark
export async function addBookmark(req: Request, res: Response): Promise<void> {
    try {
      const { mediaId, userId } = req.body;
  
  // looks in the media collection for a corresponding media item
      const mediaToBookmark = await Media.findOne({ _id: mediaId });
  
  
      if (!mediaToBookmark) {
        res.status(404).json("no content to bookmark specified");
        return;
      }
// handles toggling of bookmarks
      let bookmark = await Bookmark.findOne({media: mediaId, user: userId});

      if (bookmark) {
          // If the bookmark exists, remove it
          await Bookmark.deleteOne({ _id: bookmark._id });
      } else {
          // If the bookmark does not exist, create it
          bookmark = new Bookmark({ media: mediaId, user: userId }); 
          await bookmark.save(); 
      }
      
    
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        res.status(404).json("user not found");
        return;
      }
  // saves the bookmark against the user
      await user.save();
      res.status(200).send("bookmark operation completed successfully");
    } catch (err) {
      res.status(500).json("error while adding bookmark");
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
            //  handle if there are no bookmarks under that category
            if (!category) {
                res.send(404).json("couldn't find the category");
                return;
            } 

            // handle if no records in database yet
            const results: typeof Bookmark[] = await Bookmark.find({user: userId}).populate({path: 'media', match: {category: `${category}`}})
            
            res.status(200).json(results);
        } catch (error) {
          res.status(500).json("error while getting bookmarks");

        }
    }
    
    
    // Finds all bookmarks under a user regardless of category, for querying and filtering in frontend
     export async function getBookmarksByUser(req:Request, res:Response):Promise<void> {
      try {
        console.log("i ran!");
        
        const userId = req.params.userId;
    
        
         const results: typeof Bookmark[] = await Bookmark.find({user: userId}).populate({path: 'media'});
    
      res.status(200).json(results);
         
       } catch (error) {
         res.status(404).json("no results found");
        
       }
     
     }