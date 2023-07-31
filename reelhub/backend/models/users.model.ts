import { Schema, model, connect, Types } from 'mongoose';
// import mongoose from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    bookmarks: Types.ObjectId[];
  }
  
const userSchema = new Schema<IUser>({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    bookmarks: {type:  Schema.Types.Mixed, ref: "Bookmark"}
})
// House.find({}).populate("owner")
// for relational
// types.objectId
// https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc


  const User = model<IUser>('User', userSchema);

  export {User}



