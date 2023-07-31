
// const Media = require("../models/users.model");
import {Media} from "../models/media.model";
import {User, IUser} from "../models/users.model";
import {Bookmark} from "../models/bookmarks.model";
import {Request, Response} from "express";




export async function addBookmark(req:Request, res:Response):Promise<void> {
  try {

    const {mediaId, userId} = req.body;

    console.log("The media is:", mediaId, "and the user is:", userId);
    
     const mediaToBookmark =  await Media.findOne({ _id: mediaId});

     console.log(mediaToBookmark);
     

if (!mediaToBookmark) {

    res.status(404).json("no content to bookmark specified");
    return;
}


if (mediaToBookmark.isBookmarked) {
    res.send("already bookmarked!")
    return;

}


   const newBookmark = await Bookmark.collection.insertOne({ media: mediaToBookmark});
     const user = await User.findOne({_id: userId});


    mediaToBookmark.isBookmarked = true;

     console.log("THe new bookmark is:", newBookmark);
     console.log("the user is:", user);
     
     
if (!user) {
    res.status(404).json("user not found");
    return;
}


user.bookmarks.push(newBookmark.insertedId)


await user.save();
res.status(200).send("bookmark added successfully")
  } catch (err) {
    res.status(404).json("no results found");
  }
}

export async function removeBookmark(req:Request, res:Response):Promise<void> {
    try {
  
      const {mediaId, userId} = req.body;
  
      console.log("The media is:", mediaId, "and the user is:", userId);
      
       const mediaToRemove =  await Media.findOne({ _id: mediaId});
  
       console.log(mediaToRemove);
       
  
  if (!mediaToRemove) {
  
      res.status(404).json("no content to remove from bookmarks");
      return;
  }
  
  
  if (!mediaToRemove.isBookmarked) {
      res.status(404).json("That content is not in your bookmarks")
      return;
  
  }
  
  
     await Bookmark.collection.deleteOne({ media: mediaToRemove});
       const user = await User.findOne({_id: userId});
  
  
       mediaToRemove.isBookmarked = false;
  
      
       
       
  if (!user) {
      res.status(404).json("user not found");
      return;
  }
  
  
  const index = user.bookmarks.findIndex(bookmark => bookmark._id === mediaId);
  user.bookmarks.splice(index);
  
  
  await user.save();
  res.status(200).send("bookmark added successfully")
    } catch (err) {
      res.status(404).json("no results found");
    }
  }
  



 export async function getBookmarksByCategory(req:Request, res:Response):Promise<void> {
  try {
    console.log("i ran!");
    
    const category = req.params.category;
    console.log(category);
    
     const results: typeof Media[] = await Media.find({category: `${category}`, isBookmarked: true});
  res.status(200).json(results);
     
   } catch (error) {
     res.status(404).json("no results found");
    
   }
 
 }


